const getDB = require('../../db');
const {formatDateToDB} = require("../../helpers");


const editHotel = async (req, res, next) => {
    let connection;

    try{
        connection = await getDB();

        // comprobar q existe un hotel con esa id
        const {id} = req.params;

        const [current] = await connection.query(
            `SELECT idHotel FROM hoteles WHERE idHotel = ?`,
            [id]
        );

        // si no existe devolver 404
        if(current.length === 0) {
            const error = new Error ("No existe ningun hotel en la BBDD con ese id");
            error.httpStatus = 404;
            throw error;
        }

        // comprobar q los datos minimos vienen en el body
        const {fechaRegistro, nombre, direccion, localidad} = req.body;

        if(!fechaRegistro || !nombre || !direccion || !localidad) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

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
        if(connection) connection.release();
    }
}

module.exports = editHotel;