-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 20, 2019 at 05:16 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4people`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(64) NOT NULL,
  `admin_nickname` varchar(28) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `admin_password` varchar(32) NOT NULL,
  `admin_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_name`, `admin_nickname`, `admin_email`, `admin_password`, `admin_image`) VALUES
(46, 'Lucas Bittencourt', 'lucasnaja', 'lucasnaja0@gmail.com', '66eccf32c43c345b4e4b88bd529dc384', 'lucasnaja.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `banneds`
--

CREATE TABLE `banneds` (
  `banned_ip` bigint(15) NOT NULL,
  `banned_status` tinyint(1) NOT NULL DEFAULT 0,
  `banned_begin` datetime DEFAULT NULL,
  `banned_end` datetime DEFAULT NULL,
  `banned_amount` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `section_id` int(11) NOT NULL,
  `section_name` varchar(255) NOT NULL,
  `section_path` varchar(255) NOT NULL,
  `section_icon` varchar(255) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`section_id`, `section_name`, `section_path`, `section_icon`, `type_id`) VALUES
(2, 'Geradores', 'geradores', 'autorenew', 2),
(4, 'Validadores', 'validadores', 'check', 2),
(5, 'Funções String', 'funcoes_string', 'format_color_text', 2),
(6, 'Rede e Internet', 'rede_e_internet', 'wifi', 2),
(7, 'Codif. e Decodif.', 'codif_e_decodif', 'textsms', 2),
(8, 'Tabelas e Padrões', 'tabelas_e_padroes', 'colorize', 2),
(10, 'Cálculo de Áreas', 'calculo_de_areas', 'compare', 3),
(11, 'Cálculo de Datas', 'calculo_de_datas', 'timer', 3),
(12, 'Calculadoras', 'calculadoras', 'exposure', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `tool_id` int(11) NOT NULL,
  `tool_name` varchar(255) NOT NULL,
  `tool_path` varchar(255) NOT NULL,
  `tool_visits` bigint(20) UNSIGNED NOT NULL,
  `tool_active` tinyint(1) NOT NULL DEFAULT 1,
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`tool_id`, `tool_name`, `tool_path`, `tool_visits`, `tool_active`, `section_id`) VALUES
(7, 'Gerador de CPF', 'gerador_de_cpf', 0, 1, 2),
(8, 'Gerador de Senha', 'gerador_de_senha', 0, 1, 2),
(9, 'Gerador de Meta Tags', 'gerador_de_meta_tags', 0, 1, 2),
(10, 'Gerador de Nicks', 'gerador_de_nicks', 0, 1, 2),
(11, 'Validador de CPF', 'validador_de_cpf', 0, 1, 4),
(12, 'Contador de Caracteres', 'contador_de_caracteres', 0, 1, 5),
(13, 'Meu IP', 'meu_ip', 0, 1, 6),
(14, 'Meu Navegador', 'meu_navegador', 0, 1, 6),
(15, 'Buscar CEP', 'buscar_cep', 0, 1, 6),
(16, 'Binário, Octal e Hexadecimal', 'conversor_binario', 0, 1, 7),
(17, 'Código de Evento das Teclas', 'codigo_de_eventos_das_teclas', 0, 1, 8),
(18, 'Fatorar Número', 'fatorar_numero', 0, 1, 12),
(19, 'Máximo Divisor Comum', 'mdc', 0, 1, 12),
(20, 'Mínimo Múltiplo Comum', 'mmc', 0, 1, 12),
(21, 'Índice de Massa Corporal', 'imc', 0, 1, 12),
(22, 'Porcentagem', 'porcentagem', 0, 1, 12),
(23, 'Equação do 2° Grau', 'equacao_2_grau', 0, 1, 12),
(24, 'Números Primos', 'numeros_primos', 0, 1, 12),
(25, 'Números Amigáveis', 'numeros_amigaveis', 0, 1, 12),
(26, 'Fibonacci', 'fibonacci', 0, 1, 12),
(27, 'Conversor de Temperatura', 'conversor_de_temperatura', 0, 1, 12),
(28, 'Divisão e Resto', 'divisao_e_resto', 0, 1, 12),
(29, 'Área do Círculo', 'area_do_circulo', 0, 1, 10),
(30, 'Área do Quadrado', 'area_do_quadrado', 0, 1, 10),
(31, 'Área do Retângulo', 'area_do_retangulo', 0, 1, 10),
(32, 'Área do Triângulo', 'area_do_triangulo', 0, 1, 10),
(33, 'Área do Pentágono', 'area_do_pentagono', 0, 1, 10),
(34, 'Área do Hexágono', 'area_do_hexagono', 0, 1, 10),
(35, 'Área do Polígono Regular', 'area_do_poligono_regular', 0, 1, 10),
(36, 'Área do Losango', 'area_do_losango', 0, 1, 10),
(37, 'Área do Trapézio', 'area_do_trapezio', 0, 1, 10),
(38, 'Área do Paralelogramo', 'area_do_paralelogramo', 0, 1, 10),
(39, 'Área da Elipse', 'area_da_elipse', 0, 1, 10),
(40, 'Área da Coroa Ciricular', 'area_da_coroa_circular', 0, 1, 10),
(41, 'Área do Setor Circular', 'area_do_setor_circular', 0, 1, 10),
(42, 'Diferença entre Datas', 'diferenca_entre_datas', 0, 1, 11);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(255) NOT NULL,
  `type_path` varchar(255) NOT NULL,
  `type_icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`type_id`, `type_name`, `type_path`, `type_icon`) VALUES
(2, 'Computação', 'computacao', 'computer'),
(3, 'Matemática', 'matematica', 'functions');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `admin_nickname` (`admin_nickname`),
  ADD UNIQUE KEY `admin_email` (`admin_email`);

--
-- Indexes for table `banneds`
--
ALTER TABLE `banneds`
  ADD PRIMARY KEY (`banned_ip`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`section_id`),
  ADD UNIQUE KEY `section_name` (`section_name`),
  ADD UNIQUE KEY `section_path` (`section_path`),
  ADD UNIQUE KEY `section_icon` (`section_icon`),
  ADD KEY `type_id_fk` (`type_id`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`tool_id`),
  ADD UNIQUE KEY `tool_name` (`tool_name`),
  ADD UNIQUE KEY `tool_path` (`tool_path`),
  ADD KEY `section_id_fk` (`section_id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`type_id`),
  ADD UNIQUE KEY `type_name` (`type_name`),
  ADD UNIQUE KEY `type_path` (`type_path`),
  ADD UNIQUE KEY `type_icon` (`type_icon`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `tool_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `type_id_fk` FOREIGN KEY (`type_id`) REFERENCES `types` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tools`
--
ALTER TABLE `tools`
  ADD CONSTRAINT `section_id_fk` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
