-- ======================
--  CREACION BBDD PARLOR
-- ======================

CREATE DATABASE parlorBBDD CHARACTER SET = "utf8mb4" COLLATE="utf8mb4_unicode_ci";
use parlorBBDD;


-- ======================
-- CREACION DE LAS TABLAS
-- ======================

-- creacion tabla de usuarios
CREATE TABLE usuarios
(
  IdUsers INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  administrador BOOLEAN DEFAULT FALSE,
  CONSTRAINT usuarios_administrador_ck1
        CHECK (administrador = 0 OR administrador = 1),
  mombreApellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  -- solo un registro por correo
  CONSTRAINT usuarios_correo_uq2 UNIQUE(correo),
  telefono INT NOT NULL,
  -- solo un registro por telefono
  CONSTRAINT usuarios_telefono_uq2 UNIQUE(telefono),
  contrasena VARCHAR(100) NOT NULL,
  metodoDePago ENUM ('Tarjeta de Crédito', 'ApplePay', 'GooglePay', 'PayPal') NOT NULL,
  -- formato YYYY-mm-dd
  fechaNacimiento DATE NOT NULL
);

-- creacion tabla de hoteles
CREATE TABLE hoteles
(
  IdHotel INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(300) NOT NULL,
  localidad VARCHAR(300) NOT NULL,
  direccion VARCHAR(300) NOT NULL
);

-- creacion tabla de espacios
CREATE TABLE espacios
(
  IdEspacios INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  IdHotel INT UNSIGNED NOT NULL,
  CONSTRAINT espacios_IdHotel_fk1 
		FOREIGN KEY (IdHotel) REFERENCES hoteles(IdHotel),
  nombre VARCHAR(300) NOT NULL,
  tipoEspacio ENUM ('Sala de reuniones', 'Sala de conferencia', 'Sala de formación', 'Sala de entrevistas', 'Eventos') NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  aforo INT NOT NULL,
  precio DECIMAL(5, 2) DEFAULT 0.0,
  estado BOOLEAN DEFAULT FALSE,
  CONSTRAINT espacios_estado_ck1
        CHECK (estado = 0 OR estado = 1)
);

-- creacion tabla de equipamiento
CREATE TABLE equipamiento
(
  IdEquipamiento INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  IdEspacios INT UNSIGNED NOT NULL,
  CONSTRAINT calificacion_IdEspacios_fk1
		FOREIGN KEY (IdEspacios) REFERENCES espacios(IdEspacios),
  wifi BOOLEAN DEFAULT FALSE,
  proyector BOOLEAN DEFAULT FALSE,
  pantallaProyector BOOLEAN DEFAULT FALSE,
  television BOOLEAN DEFAULT FALSE,
  climatizacion BOOLEAN DEFAULT FALSE,
  equipoSonido BOOLEAN DEFAULT FALSE,
  catering BOOLEAN DEFAULT FALSE,
  parking BOOLEAN DEFAULT FALSE
);

-- creacion tabla de calificacion
CREATE TABLE calificacion
(
  IdCalificacion INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  IdUsers INT UNSIGNED NOT NULL,
  CONSTRAINT calificacion_IdUsers_fk2 
		FOREIGN KEY (IdUsers) REFERENCES usuarios(IdUsers),
  IdEspacios INT UNSIGNED NOT NULL,
  CONSTRAINT calificacion_IdEspacios_fk2 
		FOREIGN KEY (IdEspacios) REFERENCES espacios(IdEspacios),
  CONSTRAINT reservan_IdUsers_IdEspacios_uq1 UNIQUE (IdUsers, IdEspacios),
  comentarios VARCHAR(140) NOT NULL,
  puntuacion TINYINT DEFAULT 0,
  CONSTRAINT calificacion_puntuacion_ck1
        CHECK (puntuacion >= 1 OR puntuacion <= 5)
);

-- creacion tabla reservan
CREATE TABLE reservan
(
  IdReserva INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  IdUsers INT UNSIGNED NOT NULL,
  CONSTRAINT reservan_IdUsers_fk2 
		FOREIGN KEY (IdUsers) REFERENCES usuarios(IdUsers),
  IdEspacios INT UNSIGNED NOT NULL,
  CONSTRAINT reservan_IdEspacios_fk2 
		FOREIGN KEY (IdEspacios) REFERENCES espacios(IdEspacios),
  fechaLlegada DATE NOT NULL,
  CONSTRAINT reservan_IdEspacios_fechaLlegada_uq1 UNIQUE (IdEspacios, fechaLlegada),
  CONSTRAINT reservan_fechaLlegada_ck2
        CHECK (fechaLlegada <= fechaSalida),
  fechaSalida DATE NOT NULL,
  CONSTRAINT reservan_fechaSalida_ck2
        CHECK (fechaSalida >= fechaLlegada),
  precioReserva DECIMAL(5, 2) DEFAULT 0.0
);