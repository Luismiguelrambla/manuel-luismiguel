const getDB = require('../../db');
const { formatDateToDB } = require("../../helpers");


const editHotel = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // comprobar q existe un hotel con esa id
        const { id } = req.params;

        const dbDate = new Date(fechaRegistro);

        // hacer la query de SQL UPDATE
        await connection.query(
            `UPDATE hoteles SET fechaRegistro = ?, nombre = ?, direccion = ?, localidad = ? WHERE idHotel = ?`,
            [formatDateToDB(dbDate), nombre, direccion, localidad, id]
        );

        // devolver una respuesta

        res.send({
            status: 'ok',
            data: {
                id,
                fechaRegistro,
                nombre,
                direccion,
                localidad,
            },
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = editHotel;