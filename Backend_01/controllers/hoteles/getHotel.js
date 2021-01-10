const getDB = require('../../db');

let connection;

const getHotel = async (req, res, next) => {
    try{
        connection = await getDB();

        // saco el id de los paramentros de ruta
        const {id} = req.params;

        // hago la query
        const [result] = await connection.query(`
        SELECT * from hoteles
        WHERE hoteles.idHotel LIKE ?
        `,
        [id]
        );

        // desestructuro el elemento de los resultados
        const [single] = result;

        if(single.id === null) {
            // el elemento no existe
            const error = new Erro('El elemento no existe');
            error.httpStatus = 404;
            throw error;
        }


        // =======================================================
        /* sacamos las fotos de la entreda
        const [photos] = await connection.query(
            `SELECT photos, uploadData FROM hoteles_photos WHERE entry_id = ?`,
        [id]
        );*/
        // =======================================================

        res.send({
            message: "ok",
            data: {
                ...single,
                //photos
            }
        });
    } catch (error) {
        next(error);
    } finally {
        if(connection) connection.release();
    }
}

module.exports = getHotel;