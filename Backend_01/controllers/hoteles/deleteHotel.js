const getDB = require('../../db');
const {deletePhoto} = require("../../helpers");


const deleteHotel = async (req, res, next) => {
    let connection;

    try{
        connection = await getDB();

        const {id} = req.params;

        // comprobar que la entrada existe y si no dar un 404
        const [current] = await connection.query(
            `SELECT idHotel FROM hoteles WHERE idHotel = ?`,
            [id]
        );

        // si no existe devolver un 404
        if(current.length === 0) {
            const error = new Error ("No existe ningun hotel en la BBDD con ese id");
            error.httpStatus = 404;
            throw error;
        }

        /* =========================================================================
        // seleccionar las fotos relacionadas y borrar los ficheros de disco
        const [photos] = await connection.query(
            `SELECT photos FROM tablaPhotos WHERE tablaPhotos_id = ?`,
            [id]
        );

        // borrar las posibles fotos de la tabla hoteles_fotos
        await connection.query(
            `DELETE FROM tablaPhotos WHERE photo_id = ?`,
        [id]
        );

        // .. y del disco
        for(const item of photos) {
            await deletePhoto(item.photo);
        }
        ===========================================================================*/
        // FUTURO borrar los posibles votos de la tabla valoracion

        // borrar la entrada de la tabla hoteles
        await connection.query(
            `DELETE FROM hoteles WHERE idHotel = ?`,
        [id]
        );

        // mandar confirmacion
        res.send({
            status: 'ok',
            message: `El Hotel con id ${id} y todos sus elementos relacionas fueron borrados del sistema`
        });

    } catch (error) {
        next(error);
    } finally {
        if(connection) connection.release();
    }
}

module.exports = deleteHotel;