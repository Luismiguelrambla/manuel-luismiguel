const getDB = require('../../db');
const { formatDateToDB, savePhoto } = require('../../helpers');

let connection;

const addHotelPhoto = async (req, res, next) => {
    try {
        connection = await getDB();

        const { id } = req.params;

        // miro cuantas fotos tiene el hotel
        const [currentPhotos] = await connection.query(
            `SELECT idPhoto FROM tablaPhoto WHERE id = ?`,
            [id]
        );

        // si tiene 3 o mas fotos devuelvo un error
        if (currentPhotos.length >= 3) {
            const error = new Error('No puedes subir más fotos a este hotel, ya tienes 3');
            error.httpStatus = 403;
            throw error;
        }

        let savedPhoto;

        if (req.files && req.files.photo) {
            // guardo la foto en disco y saco el nombre con el q la guarde
            savedPhoto = await savePhoto(req.file.photo);

            // meto en la tabla de fotos una nueva foto
            await connection.query(
                `INSERT INTO tablaPhoto(uploadDate, photo, id)
                VALUES (?, ?, ?)`,
                [formatDateToDB(now), savePhoto, id]
            );
        }

        res.send({
            status: 'ok',
            photo: savedPhoto,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = addHotelPhoto;