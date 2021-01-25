const getDB = require("../../db");

let connection;

const getEspacio = async (req, res, next) => {
  try {
    connection = await getDB();

    // saco el id de los paramentros de ruta
    const { id } = req.params;

    // hago la query
    const [result] = await connection.query(
      `
        SELECT * from espacios WHERE espacios.idEspacios = ?
        `,
      [id]
    );

    // desestructuro el elemento de los resultados
    const [single] = result;

    // sacamos las fotos de la entreda
    const [
      photos,
    ] = await connection.query(
      `SELECT fotos, fechaSubida FROM fotosEspacios WHERE idEspacios = ?`,
      [id]
    );

    res.send({
      message: "ok",
      data: {
        ...single,
        photos,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getEspacio;
