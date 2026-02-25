-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2026 a las 14:37:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `juegos_reunidos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `fecha_nac` date NOT NULL,
  `genero` varchar(20) DEFAULT NULL,
  `intereses` text DEFAULT NULL,
  `pais` varchar(50) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `clave`, `fecha_nac`, `genero`, `intereses`, `pais`, `edad`, `fecha_registro`) VALUES
(1, 'ale', 'ale@ale', 'Contrasena03@', '2001-01-01', 'hombre', 'deportes', 'españa', 22, '2026-02-18 08:57:45'),
(2, 'prueba', 'prueba@prueba', 'Contrasena03@', '2000-01-01', 'hombre', 'deportes', 'españa', 22, '2026-02-19 12:46:01'),
(3, 'kaka', 'kaka@kaka', 'Juanjose2003@', '2001-01-01', 'hombre', 'musica', 'españa', 22, '2026-02-24 16:11:52'),
(4, 'juancho', 'juancho@juancho', 'Copntrasena03@', '2004-02-01', 'hombre', 'videojuegos', 'colombia', 32, '2026-02-25 13:35:03');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
