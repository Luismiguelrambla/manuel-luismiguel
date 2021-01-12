const getDB = require('../../db');
const { deletePhoto } = require("../../helpers");


const deleteHotel = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { id } = req.params;

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

        // borrar los posibles votos de la tabla valoracion
        await connection.query(
            `DELETE FROM valoracion WHERE idEspacio = ?`,
            [id]
        );

        ===========================================================================*/

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
        if (connection) connection.release();
    }
}

module.exports = deleteHotel;