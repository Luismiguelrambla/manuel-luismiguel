// const { now } = require('lodash');
const getDB = require('../../db');
const { formatDateToDB /* savePhoto */ } = require('../../helpers');


const newHotel = async (req, res, next) => {
  let connection;

  try {
    // crep conexion a la bbdd
    connection = await getDB();

    // saco los campos necesarios de req..body
    const { nombre, localidad, direccion } = req.body;

    // si los campos obligatorios (not null) no existe lanzo un error de bad request
    if (!nombre || !localidad || !direccion) {
      const error = new Error('Faltan campos');
      error.httpStatus = 400;
      throw error;
    }

    // creo un objeto con la fecha actual
    const now = new Date();

    // ejecuto la insercion en la bbdd
    const [result] = await connection.query(
      `
            INSERT INTO hoteles (fechaRegistro, nombre, localidad, direccion, user_id)
            VALUES (?, ?, ?, ?, ?);
            `,
      [formatDateToDB(now), nombre, localidad, direccion, req.userAuth.id]
    );

    // saco la id de la fila insertada
    const { insertId } = result;

    /* ============================================================================
        // procesar las imagenes
        const images = [];

        if(req.files && Object.keys(req.files).length > 0) {
            // hay imagenes
            for(const imageData of Object.values(req.files).slice(0, 3)) {
                // guardar la imagen y conseguir el nombre del fichero
                const imageFile = await saveImage(imageData);

                image.push(imageFile);
                // meter un nuevo hotel en la tabla de fotos
                await connection.query(
                    `INSERT INTO hoteles(columnas que quiero rellenar)
                    VALUES (?, ?, ?)
                    `, (formatDateToDB(now), imageFile, insertId));
            }
        }
        ============================================================================ */

    // devuelvo en data un objeto que representa la fila que acabo de insertar en la bbdd
    res.send({
      status: 'ok',
      data: {
        id: insertId,
        fechaRegistro: now,
        user_id: req.userAuth.id,
        nombre,
        localidad,
        direccion,
        // images,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newHotel;
