const getDB = require("../db");
const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { authorization } = req.headers;

    // Si no authorization está vacío devuelvo un error
    if (!authorization) {
      const error = new Error("Falta la cabecera de autorización");
      error.httpStatus = 401;
      throw error;
    }

    // Valido el token y si no es válido devuelvo un error
    let tokenInfo;
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (e) {
      const error = new Error("El token no es válido");
      error.httpStatus = 401;
      throw error;
    }

    // Inyectamos en la request la información del token
    req.userAuth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = isUser;
