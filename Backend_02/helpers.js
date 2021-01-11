const { format } = require("date-fns");
const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');
const { ensureDir } = require('fs-extra');
const { unlink } = require("fs");

const { UPLOADS_DIRECTORY } = process.env;


// Formatea un objeto de fecha a DATETIME de SQL
function formatDateToDB(dateObject) {
  return format(dateObject, "yyyy-MM-dd HH:mm:ss");
};

// funcion que permite el borrado
async function deletePhoto(photo) {
  const photoPath = path.join(uploadsDir, photo);

  await unlink(photoPath);
}

async function savePhoto(imageData) {
  // imageData es el objeto con la informacion de la imagen
  const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);

  // asegurarse que el directorio de subida de imagenes exista
  await ensureDir(uploadsDir);

  // leer la imagen con sharp
  const image = sharp(imageData.data);

  // comprobar que la imgaen no tenga un tamaño mayor a x pix de ancho
  const imageInfo = await image.metadata();

  // si es mayor que ese tamaño redimensionarla a ese tamaño
  const IMAGE_MAX_WIDTH = 1000;
  if (imageInfo > IMAGE_MAX_WIDTH) {
    image.resize(IMAGE_MAX_WIDTH);
  };

  // generar un nombre unico para la imagen
  const savedImageName = `${uuid.v4()}.jpg`;

  // guardar la imagen en el directorio de subida de imagenes
  await image.toFile(path.join(uploadsDir, savedImageName));

  // devolver el nombre del fichero
  return savedImageName;

};

module.exports = {
  formatDateToDB,
  savePhoto,
  deletePhoto
};