const getDB = require("../../db");

const listHoteles = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // saco querystring
        const {search} = req.query;
        let results;

        if (search) {
            // leo las entradas de la base de datos por busqueda
            [results] = await connection.query(`
            SELECT * from hoteles
            WHERE hoteles.localidad LIKE ?
            `,
            [`%${search}%`]
            );
        } else {
            // leo las entradas de la base de datos
            [results] = await connection.query(`
            SELECT * from hoteles;
            `);
        }

        // devuelvo un json con las entradas
        res.send({
            status: "ok",
            data: results,
        });

    } catch (error) {
        next(error);
    } finally {
        if(connection) connection.release();
    }
};


module.exports = listHoteles;