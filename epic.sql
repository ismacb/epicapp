-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2022 a las 19:52:29
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `epic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alimento`
--

CREATE TABLE `alimento` (
  `id` int(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cantidad` float NOT NULL,
  `imagen` varchar(2000) DEFAULT NULL,
  `hc` float NOT NULL,
  `proteina` float NOT NULL,
  `grasa` float NOT NULL,
  `kcal` float NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `id_entrena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alimento`
--

INSERT INTO `alimento` (`id`, `nombre`, `cantidad`, `imagen`, `hc`, `proteina`, `grasa`, `kcal`, `descripcion`, `id_entrena`) VALUES
(3, 'Pan', 30, NULL, 20, 30, 32, 234, NULL, 25),
(4, 'asd', 2, NULL, 3, 4, 5, 6, NULL, 25),
(5, 'Pan', 60, NULL, 30, 10, 20, 210, NULL, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `id_emisor` int(11) NOT NULL,
  `id_receptor` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `mensaje` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`id_emisor`, `id_receptor`, `fecha`, `mensaje`) VALUES
(24, 23, '2022-07-18', 'Hola guapo'),
(23, 24, '0000-00-00', 'yeeeeeeeee :)'),
(24, 23, '2022-07-18', 'yeep otra vez'),
(24, 25, '2022-07-18', 'Tio me gusta tu insta, llevame'),
(25, 24, '0000-00-00', 'Vale tio, son 60€ al mes'),
(24, 25, '2022-07-18', 'vale tio, te hago ya bizum'),
(24, 23, '2022-07-20', 'hola'),
(25, 24, '2022-07-20', 'hola bro'),
(24, 25, '2022-07-20', 'asdfd'),
(28, 27, '2022-07-24', 'Hola, ¿tienes hueco en las asesorias?'),
(27, 28, '2022-07-24', 'Claro tio!!'),
(29, 27, '2022-07-24', 'Me llevas?'),
(27, 29, '2022-07-24', 'Claro!!'),
(30, 27, '2022-07-24', 'Me gustaria una asesoria'),
(27, 30, '2022-07-24', 'Perfecto, te agrego'),
(30, 27, '2022-07-24', 'Gracias!!'),
(31, 27, '2022-07-24', 'Hola, puedes asesorarme?'),
(27, 31, '2022-07-24', 'Claro, te agrego');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comida`
--

CREATE TABLE `comida` (
  `id` int(11) NOT NULL,
  `id_entrenador` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `obsentrenador` varchar(2000) DEFAULT NULL,
  `obscliente` varchar(2000) DEFAULT NULL,
  `totalkcal` float NOT NULL,
  `hecho` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comida`
--

INSERT INTO `comida` (`id`, `id_entrenador`, `id_cliente`, `tipo`, `fecha`, `obsentrenador`, `obscliente`, `totalkcal`, `hecho`) VALUES
(1, 25, 24, 'Desayuno', '2022-07-18', NULL, NULL, 3000, 1),
(3, 25, 24, 'aasd', '2022-07-23', NULL, 'De locos!!', 234, 0),
(4, 27, 30, 'Desayuno', '2022-07-24', NULL, NULL, 210, 0),
(5, 27, 31, 'Desayuno', '2022-07-24', NULL, NULL, 210, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comidaalimento`
--

CREATE TABLE `comidaalimento` (
  `id_comida` int(10) NOT NULL,
  `id_alimento` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comidaalimento`
--

INSERT INTO `comidaalimento` (`id_comida`, `id_alimento`) VALUES
(3, 3),
(4, 5),
(5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comidacliente`
--

CREATE TABLE `comidacliente` (
  `id_cliente` int(11) NOT NULL,
  `id_comida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio`
--

CREATE TABLE `ejercicio` (
  `id` int(10) NOT NULL,
  `imagen` varchar(2000) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `series` int(10) NOT NULL,
  `reps` int(10) NOT NULL,
  `rir` int(10) NOT NULL,
  `peso` float DEFAULT NULL,
  `id_entrena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ejercicio`
--

INSERT INTO `ejercicio` (`id`, `imagen`, `url`, `descripcion`, `nombre`, `series`, `reps`, `rir`, `peso`, `id_entrena`) VALUES
(6, NULL, NULL, NULL, 'dsaf', 3, 4, 4, NULL, 25),
(7, NULL, NULL, NULL, 'pesho', 2, 3, 2, NULL, 25),
(8, NULL, NULL, NULL, 'Press de banca', 3, 12, 8, NULL, 25),
(9, NULL, NULL, NULL, 'Press de banca', 3, 12, 8, NULL, 27),
(10, NULL, NULL, NULL, 'Aperturas máquina', 4, 10, 8, NULL, 27),
(11, NULL, NULL, NULL, 'Cruce poleas', 3, 12, 8, NULL, 27),
(12, NULL, NULL, NULL, 'Sentadilla', 2, 12, 9, NULL, 27),
(13, NULL, NULL, NULL, 'Flexiones', 3, 12, 8, NULL, 27),
(14, NULL, NULL, NULL, 'Jalon al pecho', 3, 5, 8, NULL, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenadorcliente`
--

CREATE TABLE `entrenadorcliente` (
  `id_entrenador` int(10) NOT NULL,
  `id_cliente` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrenadorcliente`
--

INSERT INTO `entrenadorcliente` (`id_entrenador`, `id_cliente`) VALUES
(27, 28),
(27, 30),
(27, 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenamiento`
--

CREATE TABLE `entrenamiento` (
  `id` int(10) NOT NULL,
  `id_entrenador` int(10) NOT NULL,
  `id_cliente` int(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `minutos` int(10) NOT NULL,
  `obsentrenador` varchar(2000) DEFAULT NULL,
  `obscliente` varchar(2000) DEFAULT NULL,
  `hecho` tinyint(1) NOT NULL,
  `rir` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrenamiento`
--

INSERT INTO `entrenamiento` (`id`, `id_entrenador`, `id_cliente`, `nombre`, `fecha`, `minutos`, `obsentrenador`, `obscliente`, `hecho`, `rir`) VALUES
(16, 25, 24, 'Espalda', '2022-07-24', 22, NULL, 'flipas', 1, 8),
(17, 25, 24, 'nomwweee', '2022-07-24', 1044, NULL, NULL, 0, NULL),
(18, 27, 30, 'Torso', '2022-07-23', 45, NULL, NULL, 0, NULL),
(19, 27, 30, 'Pierna', '2022-07-24', 30, NULL, NULL, 0, NULL),
(20, 27, 31, 'Pecho', '2022-07-24', 30, NULL, 'Muy cañero', 1, 9),
(21, 27, 31, 'Espalda y hombro', '0000-00-00', 22, NULL, NULL, 0, NULL),
(22, 27, 28, 'pecho', '2022-07-24', 23, NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenamientoejercicio`
--

CREATE TABLE `entrenamientoejercicio` (
  `id_entrenamiento` int(10) NOT NULL,
  `id_ejercicio` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `entrenamientoejercicio`
--

INSERT INTO `entrenamientoejercicio` (`id_entrenamiento`, `id_ejercicio`) VALUES
(12, 8),
(16, 8),
(17, 7),
(18, 9),
(18, 10),
(18, 11),
(19, 12),
(20, 9),
(20, 13),
(21, 11),
(22, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medidascliente`
--

CREATE TABLE `medidascliente` (
  `id_cli` int(11) NOT NULL,
  `altura` float NOT NULL,
  `peso` float NOT NULL,
  `imc` float NOT NULL,
  `pbrazo` float NOT NULL,
  `pcintura` float NOT NULL,
  `pmuslo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medidascliente`
--

INSERT INTO `medidascliente` (`id_cli`, `altura`, `peso`, `imc`, `pbrazo`, `pcintura`, `pmuslo`) VALUES
(24, 186, 87, 25.15, 33.2, 50, 40),
(24, 186, 89, 25.15, 33.2, 50, 40),
(24, 186, 95, 25.73, 38, 45, 43),
(24, 186, 65, 27.46, 38, 45, 49),
(24, 186, 75, 18.79, 38, 60, 49),
(24, 186, 78, 21.68, 38, 60, 49),
(24, 186, 82, 22.55, 45, 60, 49),
(30, 1.7, 71, 0, 20, 60, 40),
(30, 170, 71, 245700, 20, 60, 40),
(30, 170, 71, 24.57, 50, 60, 40),
(30, 170, 78, 24.57, 50, 60, 40),
(31, 180, 80, 0, 20, 60, 50),
(31, 180, 82, 24.69, 20, 65, 50),
(31, 180, 82.3, 25.31, 20, 65, 50),
(31, 180, 82.3, 25.4, 25, 65, 50),
(31, 180, 82.3, 25.4, 30, 65, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `likes` int(11) NOT NULL,
  `ubicacion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`id`, `id_usuario`, `titulo`, `imagen`, `descripcion`, `likes`, `ubicacion`) VALUES
(11, 27, 'Nuevo logo!!', 'descarga.png', 'Para mis asesorados', 201, 'Alicante'),
(12, 27, 'Creatina', 'descarga.jpg', 'Creatina top para mi gente', 25, 'Alicante'),
(13, 28, 'Entrenando duro!!', 'for-miles-a-great-bodyweight-workout-would-include-squats-push-ups-walking-lunges-.jpg', 'Estrando gym', 0, 'Alicante'),
(14, 31, 'Empezando', '15523046827096.jpg', 'A disfrutar', 0, 'Alicante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `nick` varchar(50) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(150) DEFAULT NULL,
  `edad` int(3) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `imc` int(5) DEFAULT NULL,
  `altura` float DEFAULT NULL,
  `peso` float DEFAULT NULL,
  `pcintura` float DEFAULT NULL,
  `pmuslo` float DEFAULT NULL,
  `pbrazo` float DEFAULT NULL,
  `titulacion` varchar(500) DEFAULT NULL,
  `imagen` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `rol`, `email`, `password`, `nick`, `nombre`, `apellidos`, `edad`, `telefono`, `imc`, `altura`, `peso`, `pcintura`, `pmuslo`, `pbrazo`, `titulacion`, `imagen`) VALUES
(22, 'ENTRENADOR', 'hola12@gmail.com', '$2a$10$k3YlH3AWNhcAlZDFr4UE2u/S0MM1tyo1UwziNuDNe5Tk3kmdhYkbS', 'hola12', 'asdf', 'asdf', 22, '23', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(23, 'ENTRENADOR', 'ho@gmail.com', '$2a$10$7/RAm0030dzXZuaTAoK3uuvATkUAQ3nMqDNcC/B4ZWKk/prh.YjN6', 'as', 'sdfa', 'sdf', 23, '23', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(24, 'CLIENTE', 'clie@gmail.com', '$2a$10$RHtw3tZwF3xm6rAB966NDOQwfHMGF51LMl6kRbc.IDt/bYH/dAhaq', 'cli', 'cliente3343', 'cliente', 23, '34534', NULL, NULL, NULL, NULL, NULL, NULL, '', ''),
(25, 'ENTRENADOR', 'ent@gmail.com', '$2a$10$h.1GlrH563xCOj0r0/2OW.AW6WRAhDIQuAzJQ8xVjo.Zq56zmGL/O', 'ent', 'entrenador', 'adf', 33, '12342', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(27, 'ENTRENADOR', 'entrenador@gmail.com', '$2a$10$78D4sZzx8WsFr4CU0UZ9xOdSPk5M2B.i36hPLyDVh4Xylf7kZNA3C', 'Entrenador', 'Ismael', 'Caceres', 23, '611555896', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(28, 'CLIENTE', 'ismacb20@gmail.com', '$2a$10$BNAwdbpm5eVI/4s2ccPL7esvNh/k1BWvetd/nAXS5.MXppyQ5N3Qi', 'Ismael', 'Isma', 'Caceres', 22, '675486951', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(29, 'CLIENTE', 'adrian@gmail.com', '$2a$10$cO60Vz46QtAzTo1OSte7lORkRP.0Z.P5HAazUwP6YphbjonehAhBe', 'Adrian', 'Adri', 'Valero', 22, '689569321', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(30, 'CLIENTE', 'maria@gmail.com', '$2a$10$1BvG8E6flBnfeJuEjnP4i.0dKsPmgdRcRqZJXYwX5VyUL0wp9twJO', 'Maria', 'Maria', 'Garcia', 23, '6522222', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(31, 'CLIENTE', 'juan@gmail.com', '$2a$10$RUORWoSNmdiyJZeMU1mgTenjPunIUR4vuFI7lDCyo28/22FpiK3ku', 'Juan', 'Juan', 'Valero', 23, '789456321', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alimento`
--
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kf_entrenador` (`id_entrena`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD KEY `fk_usu` (`id_emisor`),
  ADD KEY `fk_rece` (`id_receptor`);

--
-- Indices de la tabla `comida`
--
ALTER TABLE `comida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Fk_comid` (`id_cliente`);

--
-- Indices de la tabla `comidaalimento`
--
ALTER TABLE `comidaalimento`
  ADD PRIMARY KEY (`id_comida`,`id_alimento`),
  ADD KEY `fk_alimento` (`id_alimento`);

--
-- Indices de la tabla `comidacliente`
--
ALTER TABLE `comidacliente`
  ADD PRIMARY KEY (`id_cliente`,`id_comida`);

--
-- Indices de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `df` (`id_entrena`);

--
-- Indices de la tabla `entrenadorcliente`
--
ALTER TABLE `entrenadorcliente`
  ADD PRIMARY KEY (`id_entrenador`,`id_cliente`),
  ADD KEY `fk_a_cliente` (`id_cliente`);

--
-- Indices de la tabla `entrenamiento`
--
ALTER TABLE `entrenamiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_entrenador` (`id_entrenador`),
  ADD KEY `fk_cliente` (`id_cliente`);

--
-- Indices de la tabla `entrenamientoejercicio`
--
ALTER TABLE `entrenamientoejercicio`
  ADD PRIMARY KEY (`id_entrenamiento`,`id_ejercicio`),
  ADD KEY `fk_ejer` (`id_ejercicio`);

--
-- Indices de la tabla `medidascliente`
--
ALTER TABLE `medidascliente`
  ADD KEY `fk_cl` (`id_cli`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nick` (`nick`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alimento`
--
ALTER TABLE `alimento`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `comida`
--
ALTER TABLE `comida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `entrenamiento`
--
ALTER TABLE `entrenamiento`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alimento`
--
ALTER TABLE `alimento`
  ADD CONSTRAINT `kf_entrenador` FOREIGN KEY (`id_entrena`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_rece` FOREIGN KEY (`id_receptor`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_usu` FOREIGN KEY (`id_emisor`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `comida`
--
ALTER TABLE `comida`
  ADD CONSTRAINT `Fk_comid` FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `comidaalimento`
--
ALTER TABLE `comidaalimento`
  ADD CONSTRAINT `fk_alimento` FOREIGN KEY (`id_alimento`) REFERENCES `alimento` (`id`),
  ADD CONSTRAINT `fk_comida` FOREIGN KEY (`id_comida`) REFERENCES `comida` (`id`);

--
-- Filtros para la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD CONSTRAINT `df` FOREIGN KEY (`id_entrena`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `entrenadorcliente`
--
ALTER TABLE `entrenadorcliente`
  ADD CONSTRAINT `fk_a_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_a_entrenador` FOREIGN KEY (`id_entrenador`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `entrenamiento`
--
ALTER TABLE `entrenamiento`
  ADD CONSTRAINT `fk_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_entrenador` FOREIGN KEY (`id_entrenador`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `entrenamientoejercicio`
--
ALTER TABLE `entrenamientoejercicio`
  ADD CONSTRAINT `fk_ejer` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicio` (`id`),
  ADD CONSTRAINT `fk_entrenamiento` FOREIGN KEY (`id_entrenamiento`) REFERENCES `entrenamiento` (`id`);

--
-- Filtros para la tabla `medidascliente`
--
ALTER TABLE `medidascliente`
  ADD CONSTRAINT `fk_cl` FOREIGN KEY (`id_cli`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
