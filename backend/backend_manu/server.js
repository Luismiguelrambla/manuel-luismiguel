require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// controladores de hoteles
const {
  listHoteles,
  getHotel,
  newHotel,
  editHotel,
  deleteHotel,
  addHotelPhoto,
  deleteHotelPhoto,
} = require("./controllers/hoteles");

// controladores de usuarios
const {
  newUser,
  validateUser,
  loginUser,
  getUser,
  deleteUser,
  editUser,
  editUserPassword,
  recoverUserPassword,
  resetUserPassword,
} = require("./controllers/usuarios");

/*const { 
    voteSpaces,
} = require('./controllers/espacios');*/

// middlewares
const hotelExists = require("./middlewares/hotelExists");
const userExists = require("./middlewares/userExists");
const isUser = require("./middlewares/isUser");
const canEdit = require("./middlewares/canEdit");

const { PORT } = process.env;

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
app.use(express.static(path.join(__dirname, "static")));

/* 
  Rutas Hoteles API
*/

// GET - /hoteles
// Devuelve todos los elementos de la tabla de hoteles ✅
app.get("/hoteles", listHoteles);

// GET - /hoteles/:id
// Devuelve un solo hotel ✅
app.get("/hoteles/:id", hotelExists, getHotel);

// POST - /hoteles (token)
// Crea un nuevo hotel ✅
app.post("/hoteles", isUser, newHotel);

// PUT - /hoteles/:id (token)
// Edita un hotel en la BBDD ✅
app.put("/hoteles/:id", isUser, hotelExists, canEdit, editHotel);

// DELETE - /hoteles/:id (token)
// Borra un hotel en la BBDD ✅
app.delete("/hoteles/:id", isUser, hotelExists, canEdit, deleteHotel);

// POST - /hoteles/:id/photos (token)
// Añade una foto a un hotel ✅
app.post("/hoteles/:id/photos", isUser, hotelExists, canEdit, addHotelPhoto);

// DELETE -/hoteles/:id/photos/:photosId (token)
// Borra una foto a un hotel ✅
app.delete(
  "/hoteles/:id/photos/:photosId",
  isUser,
  hotelExists,
  canEdit,
  deleteHotelPhoto
);

/*// POST -/hoteles/:id/votes (token)
// Vota una entrada
app.post("/hoteles/:id/votes", hotelExists, voteSpaces);*/

/* 
    Rutas usuarios API
*/

// POST -/users
// Registra un nuevo usuario (sin validar) ✅
app.post("/usuarios", newUser);

// GET - /users//users/validate/:validationCode
// Valida un usuario que se acaba de registrar ✅
app.get("/users/validate/:registrationCode", validateUser);

// POST - /users/login
// Hace login de un usuario ✅
app.post("/usuarios/login", loginUser);

// GET - /users/:id
// Muestra información de usuario ✅
app.get("/usuarios/:id", isUser, userExists, getUser);

// DELETE - /users/:id
// Anonimiza un usuario ✅
app.delete("/usuarios/:id", isUser, userExists, deleteUser);

// PUT - /users/:id
// Edita los datos de un usuario ✅
app.put("/usuarios/:id", isUser, userExists, editUser);

// PUT - /users/:id/password
// Edita la contraseña de un usuario ✅
app.put("/usuarios/:id/password", isUser, userExists, editUserPassword);

// POST - /users/recover-password
// Enviar un correo con el código de reseteo de contraseña a un correo ✅
app.post("/usuarios/recover-password", recoverUserPassword);

// POST - /users/reset-password
// Cambiar la contraseña de un usuario
app.post("/usuarios/reset-password", resetUserPassword);

// Middlewares finales

// Middleware de error || devuelve .json tiene entrada status error y mensaje error
app.use((error, req, res, next) => {
  console.error(error);
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
  console.log(`Servidor funcionando en http://localhost:${PORT} 🔥`);
});
