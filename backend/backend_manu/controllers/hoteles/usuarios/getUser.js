const getDB = require("../../db");

const getUser = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // Saco la id de usuario de req.params
    const { id } = req.params;

    // Saco toda la información de usuario
    const [user] = await connection.query(
      `
      SELECT idUsuario, fechaRegistro, correo, nombre, apellidos, avatar, telefono, role
      FROM usuarios 
      WHERE idUsuario=?
    `,
      [id]
    );

    // Creo la respuesta básica
    const userInfo = {
      nombre: user[0].nombre,
      apellidos: user[0].apellidos,
      avatar: user[0].avatar,
    };

    // Si el usuario solicitado coíncide con el del token añado a la respuesta básica los datos privados
    if (
      user[0].idUsuario === req.userAuth.id ||
      req.userAuth.role === "admin"
    ) {
      userInfo.fecha = user[0].fechaRegistro;
      userInfo.correo = user[0].correo;
      userInfo.role = user[0].role;
      userInfo.telefono = user[0].telefono;
    }

    // Devuelvo la respuesta
    res.send({
      status: "Ok",
      data: userInfo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUser;
