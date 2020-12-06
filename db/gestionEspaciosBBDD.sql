CREATE DATABASE  IF NOT EXISTS `parlorBBDD` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `parlorBBDD`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: parlorBBDD
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificacion` (
  `IdCalificacion` int unsigned NOT NULL AUTO_INCREMENT,
  `IdUsers` int unsigned NOT NULL,
  `IdEspacios` int unsigned NOT NULL,
  `comentarios` varchar(140) COLLATE utf8mb4_unicode_ci NOT NULL,
  `puntuacion` tinyint DEFAULT '0',
  PRIMARY KEY (`IdCalificacion`),
  UNIQUE KEY `calificacion_IdUsers_uq2` (`IdUsers`),
  UNIQUE KEY `calificacion_IdEspacios_uq2` (`IdEspacios`),
  CONSTRAINT `calificacion_IdEspacios_fk2` FOREIGN KEY (`IdEspacios`) REFERENCES `espacios` (`IdEspacios`),
  CONSTRAINT `calificacion_IdUsers_fk2` FOREIGN KEY (`IdUsers`) REFERENCES `usuarios` (`IdUsers`),
  CONSTRAINT `calificacion_puntuacion_ck1` CHECK (((`puntuacion` >= 1) or (`puntuacion` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacion`
--

LOCK TABLES `calificacion` WRITE;
/*!40000 ALTER TABLE `calificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `calificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamiento`
--

DROP TABLE IF EXISTS `equipamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipamiento` (
  `IdEquipamiento` int unsigned NOT NULL AUTO_INCREMENT,
  `IdEspacios` int unsigned NOT NULL,
  `wifi` bit(1) DEFAULT b'0',
  `proyector` bit(1) DEFAULT b'0',
  `pantallaProyector` bit(1) DEFAULT b'0',
  `television` bit(1) DEFAULT b'0',
  `climatizacion` bit(1) DEFAULT b'0',
  `equipoSonido` bit(1) DEFAULT b'0',
  `catering` bit(1) DEFAULT b'0',
  `parking` bit(1) DEFAULT b'0',
  PRIMARY KEY (`IdEquipamiento`),
  KEY `calificacion_IdEspacios_fk1` (`IdEspacios`),
  CONSTRAINT `calificacion_IdEspacios_fk1` FOREIGN KEY (`IdEspacios`) REFERENCES `espacios` (`IdEspacios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamiento`
--

LOCK TABLES `equipamiento` WRITE;
/*!40000 ALTER TABLE `equipamiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `espacios`
--

DROP TABLE IF EXISTS `espacios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `espacios` (
  `IdEspacios` int unsigned NOT NULL AUTO_INCREMENT,
  `IdHotel` int unsigned NOT NULL,
  `nombre` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipoEspacio` enum('Sala de reuniones','Sala de conferencia','Sala de formación','Sala de entrevistas','Eventos') COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aforo` int NOT NULL,
  `precio` decimal(3,2) DEFAULT '0.00',
  `estado` tinyint DEFAULT '0',
  PRIMARY KEY (`IdEspacios`),
  KEY `espacios_IdHotel_fk1` (`IdHotel`),
  CONSTRAINT `espacios_IdHotel_fk1` FOREIGN KEY (`IdHotel`) REFERENCES `hoteles` (`IdHotel`),
  CONSTRAINT `espacios_estado_ck1` CHECK (((`estado` = 0) or (`estado` = 1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `espacios`
--

LOCK TABLES `espacios` WRITE;
/*!40000 ALTER TABLE `espacios` DISABLE KEYS */;
/*!40000 ALTER TABLE `espacios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoteles`
--

DROP TABLE IF EXISTS `hoteles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoteles` (
  `IdHotel` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `localidad` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`IdHotel`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoteles`
--

LOCK TABLES `hoteles` WRITE;
/*!40000 ALTER TABLE `hoteles` DISABLE KEYS */;
INSERT INTO `hoteles` VALUES (1,'NH-Hoteles','Sevilla','Avenida Kansas City, 41003'),(2,'AC-Hoteles','Barcelona','Las Ramblas, 48004');
/*!40000 ALTER TABLE `hoteles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservan`
--

DROP TABLE IF EXISTS `reservan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservan` (
  `IdReserva` int unsigned NOT NULL AUTO_INCREMENT,
  `IdUsers` int unsigned NOT NULL,
  `IdEspacios` int unsigned NOT NULL,
  `fechaLlegada` date NOT NULL,
  `fechaSalida` date NOT NULL,
  PRIMARY KEY (`IdReserva`),
  UNIQUE KEY `calificacion_IdEspacios_uq2` (`IdEspacios`),
  UNIQUE KEY `reservan_fechaLlegada_uq2` (`fechaLlegada`),
  KEY `reservan_IdUsers_fk2` (`IdUsers`),
  CONSTRAINT `reservan_IdEspacios_fk2` FOREIGN KEY (`IdEspacios`) REFERENCES `espacios` (`IdEspacios`),
  CONSTRAINT `reservan_IdUsers_fk2` FOREIGN KEY (`IdUsers`) REFERENCES `usuarios` (`IdUsers`),
  CONSTRAINT `reservan_fechaLlegada_ck2` CHECK ((`fechaLlegada` <= `fechaSalida`)),
  CONSTRAINT `reservan_fechaSalida_ck2` CHECK ((`fechaSalida` >= `fechaLlegada`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservan`
--

LOCK TABLES `reservan` WRITE;
/*!40000 ALTER TABLE `reservan` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `IdUsers` int unsigned NOT NULL AUTO_INCREMENT,
  `administrador` tinyint DEFAULT '0',
  `mombreApellidos` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` int NOT NULL,
  `contrasena` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metodoDePago` enum('Tarjeta de Crédito','ApplePay','GooglePay','PayPal') COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechaNacimiento` date NOT NULL,
  PRIMARY KEY (`IdUsers`),
  UNIQUE KEY `usuarios_correo_uq2` (`correo`),
  UNIQUE KEY `usuarios_telefono_uq2` (`telefono`),
  CONSTRAINT `usuarios_administrador_ck1` CHECK (((`administrador` = 0) or (`administrador` = 1)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,0,'Antonio Pérez Carmona','antonioperez@gmail.com',602358897,'contraseña01','ApplePay','1980-06-11'),(2,1,'Raquel Naranjo Castañeda','raquelnaranjo@gmail.com',616584733,'contraseña02','Tarjeta de Crédito','1993-03-21');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-06 21:29:06
