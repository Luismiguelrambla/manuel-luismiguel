require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

// controladores
const  {listHoteles, getHotel, newHotel, editHotel, deleteHotel} = require('./controllers/hoteles');

const {PORT} = process.env;

// creo la app de express
const app = express();

// aplico middlewares

// logger
app.use(morgan("dev"));

//body parsers (body en JSON)
app.use(bodyParser.json());

// body parser (multipart from data <- subida de imagenes)
app.use(fileUpload());

// static
app.use(express.static(path.join(__dirname, 'static')));

// rutas de la API

// GET - /hoteles
//devuelve todos los elementos de la tabla de hoteles
app.get("/hoteles", listHoteles);

// GET - /hoteles/:id
// devuelve un solo hotel
app.get("/hoteles/:id", getHotel);

//POST - /hoteles
// crea un nuevo hotel
app.post("/hoteles", newHotel);

// PUT - /hoteles/:id
// edita un hotel en la BBDD
app.put("/hoteles/:id", editHotel);

// DELETE - /hoteles/:id
// borra un hotel en la BBDD
app.delete("/hoteles/:id", deleteHotel);

// middleware de error || devuelve .json tiene entrada status error y mensaje error
app.use((error, req, res, next) => {
    res.status(error.httpStatus || 500).send({
        status: "error",
        message: error.message,
    });
});

// middleware 404
app.use((req, res) => {
    res.status(404).send({
        status: "error",
        message: "Not found",
    });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT} 🔥`)
});