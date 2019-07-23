-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jul 23, 2019 at 02:48 PM
-- Server version: 8.0.16
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4People`
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
  `banned_status` tinyint(1) NOT NULL DEFAULT '0',
  `banned_begin` datetime DEFAULT NULL,
  `banned_end` datetime DEFAULT NULL,
  `banned_amount` tinyint(1) NOT NULL DEFAULT '1'
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
  `tool_description` text,
  `tool_link` text,
  `tool_visits` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `tool_active` tinyint(1) NOT NULL DEFAULT '1',
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`tool_id`, `tool_name`, `tool_path`, `tool_description`, `tool_link`, `tool_visits`, `tool_active`, `section_id`) VALUES
(7, 'Gerador de CPF', 'gerador_de_cpf', 'Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/CPFGenerator.js', 11, 1, 2),
(8, 'Gerador de Senha', 'gerador_de_senha', 'Gerador de Senha Online para gerar senhas personalizadas e fortes.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/passwordGenerator.js', 5, 1, 2),
(9, 'Gerador de Meta Tags', 'gerador_de_meta_tags', 'Gerador de Meta Tags Online, feito para gerar várias das Meta Tags existentes.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/metaTagsGenerator.js', 1, 1, 2),
(10, 'Gerador de Nicks', 'gerador_de_nicks', 'Gerador de Nicks Online para gerar diversos tipos de nicks aleatórios.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/nickGenerator.js', 2, 1, 2),
(11, 'Validador de CPF', 'validador_de_cpf', 'Validador de CPF Online para validar CPFs para programadores testarem seus softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/validators/CPFValidator.js', 4, 1, 4),
(12, 'Contador de Caracteres', 'contador_de_caracteres', 'Contador de letras, caracteres sem espaço, palavras, espaços, vogais, consoantes, números e linhas.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/string_functions/charactersCount.js', 2, 1, 5),
(13, 'Meu IP', 'meu_ip', 'Veja seu IP e muito mais informações aqui.', 'https://github.com/lucasnaja/4People/blob/master/computacao/rede_e_internet/meu_ip/src/index.js', 1, 1, 6),
(14, 'Meu Navegador', 'meu_navegador', 'Veja seu Navegador aqui.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/network_and_internet/myWebBrowser.js', 1, 1, 6),
(15, 'Buscar CEP', 'buscar_cep', 'Busque informações de seu CEP, como Rua, Cidade, Bairro e Estado aqui.', 'https://github.com/lucasnaja/4People/blob/master/computacao/rede_e_internet/buscar_cep/src/index.js', 1, 1, 6),
(16, 'Binário, Octal e Hexadecimal', 'conversor_binario', 'Tradutor Online de Código Binário. Basta digitar o código binário ou texto abaixo e clicar no botão para converter.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/encoders_decoders/binaryConverter.js', 2, 1, 7),
(17, 'Código de Evento das Teclas', 'codigo_de_eventos_das_teclas', 'Código de Eventos das Teclas para descobrir cada keyCode da tecla e criar eventos em sua linguagem de preferência.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/tables_and_patterns/jsEventKeyCodes.js', 1, 1, 8),
(18, 'Fatorar Número', 'fatorar_numero', 'Calculadora Online para Fatorar Números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/factorization.js', 4, 1, 12),
(19, 'Máximo Divisor Comum', 'mdc', 'Calculadora Online para encontrar o Máximo Divisor Comum entre vários números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/GCD.js', 3, 1, 12),
(20, 'Mínimo Múltiplo Comum', 'mmc', 'Calculadora Online para encontrar o Mínimo Múltiplo Comum entre vários números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/LCM.js', 2, 1, 12),
(21, 'Índice de Massa Corporal', 'imc', 'Calculadora de Índice de Massa Corporal Online para calcular o IMC e o seu peso ideal.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/BMI.js', 1, 1, 12),
(22, 'Porcentagem', 'porcentagem', 'Calculadora de Porcentagem Online com vários métodos para encontrar a porcentagem, como aumentos, descontos, proporções, etc.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/percentage.js', 2, 1, 12),
(23, 'Equação do 2° Grau', 'equacao_2_grau', 'Cálculo da Equção do 2° Grau (Bhaskara) Online. Δ = B² - 4 * A * C, X = (-B +- √Δ) / 2 * A', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/bhaskara.js', 3, 1, 12),
(24, 'Números Primos', 'numeros_primos', 'Calculadora de Números Primos Online para verificar se número é primo ou não.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/primeNumbers.js', 2, 1, 12),
(25, 'Números Amigáveis', 'numeros_amigaveis', 'Números amigáveis são pares de números onde um deles é a soma dos divisores do outro. Por exemplo, os divisores de 220 são 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 e 110, cuja soma é 284. Por outro lado, os divisores de 284 são 1, 2, 4, 71 e 142 e a soma deles é 220.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/friendlyNumbers.js', 2, 1, 12),
(26, 'Fibonacci', 'fibonacci', 'Calculadora para calcular a Sequência de Fibonacci. Ex: 0, 1, 1, 2, 3, 5, 8, 13, etc...', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/fibonacci.js', 2, 1, 12),
(27, 'Conversor de Temperatura', 'conversor_de_temperatura', 'Conversor de Temperatura Online para calcular Graus Celsius, Fahrenheit e Kelvin.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/temperatureConversor.js', 2, 1, 12),
(28, 'Divisão e Resto', 'divisao_e_resto', 'Calculadora de Divisão Online que mostra o resultado da divisão comum e inteira entre dois números e o resto (módulo) entre eles.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/divisionAndRest.js', 2, 1, 12),
(29, 'Área do Círculo', 'area_do_circulo', 'Calculador de Área do Círculo Online. R = Raio, D = Diâmetro (2 * R), PI = 3.141592653589793... (Math.PI.toFixed(48))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circleArea.js', 5, 1, 10),
(30, 'Área do Quadrado', 'area_do_quadrado', 'Calculador de Área do Quadrado Online. Área do Quadrado = Lado * Lado ou L²', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/squareArea.js', 3, 1, 10),
(31, 'Área do Retângulo', 'area_do_retangulo', 'Calculador de Área do Retângulo Online. Área do Retângulo = Base * Altura', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/rectangleArea.js', 2, 1, 10),
(32, 'Área do Triângulo', 'area_do_triangulo', 'Calculador de Área do Triângulo Online. Área do Triângulo = Base * Altura / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/triangleArea.js', 2, 1, 10),
(33, 'Área do Pentágono', 'area_do_pentagono', 'Calculador de Área do Pentágono Online. Área do Pentágono = (5 * Lado²) / (4 * tan(36°))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/pentagonArea.js', 2, 1, 10),
(34, 'Área do Hexágono', 'area_do_hexagono', 'Calculador de Área do Hexágono Online. Área do Hexágono = (6 * Lado²) / (4 * tan(30°))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/hexagonArea.js', 1, 1, 10),
(35, 'Área do Polígono Regular', 'area_do_poligono_regular', 'Calculador de Área do Polígono Regular Online. π = PI, Área do Polígono Regular = (Lado² * Qntd de Lados) / (4 * tan(π / 10))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/regularPolygonArea.js', 1, 1, 10),
(36, 'Área do Losango', 'area_do_losango', 'Calculador de Área do Losango Online. Área do Losango = (Diagonal1 * Diagonal2) / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/diamondArea.js', 1, 1, 10),
(37, 'Área do Trapézio', 'area_do_trapezio', 'Calculador de Área do Trapézio Online. B = Base maior, b = Base menor, A = Altura, Área do Trapézio = (B + b) * A / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/trapezoidArea.js', 1, 1, 10),
(38, 'Área do Paralelogramo', 'area_do_paralelogramo', 'Calculador de Área do Paralelogramo Online. Área do Paralelogramo = Base * Altura', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/parallelogramArea.js', 1, 1, 10),
(39, 'Área da Elipse', 'area_da_elipse', 'Calculador de Área da Elipse Online. π = PI, Área da Elipse = π * Eixo maior * Eixo menor', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/ellipseArea.js', 1, 1, 10),
(40, 'Área da Coroa Ciricular', 'area_da_coroa_circular', 'Calculador de Área da Coroa Circular Online. π = PI, R = Raio maior, r = Raio menor, Área da Coroa Circular = π * (R² - r²)', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circularCrownArea.js', 2, 1, 10),
(41, 'Área do Setor Circular', 'area_do_setor_circular', 'Calculador de Área do Setor Circular Online. π = PI, Área do Setor Circular = π * (Raio² * Ângulo) / 360', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circularSectorArea.js', 1, 1, 10),
(42, 'Diferença entre Datas', 'diferenca_entre_datas', 'Calcular Diferença entre Datas. Possui um leque de recursos disponíveis, como calcular idades, tempo, etc.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/dates_calculator/differenceBetweenDates.js', 75, 1, 11);

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
  MODIFY `tool_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

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
  ADD CONSTRAINT `type_id_fk` FOREIGN KEY (`type_id`) REFERENCES `types` (`type_id`);

--
-- Constraints for table `tools`
--
ALTER TABLE `tools`
  ADD CONSTRAINT `section_id_fk` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
