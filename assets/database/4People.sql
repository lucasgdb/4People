-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Oct 09, 2019 at 08:07 PM
-- Server version: 8.0.17
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
(4, 'Lucas Bittencourt', 'lucasnaja', 'lucasnaja0@gmail.com', '66eccf32c43c345b4e4b88bd529dc384', 'lucasnaja.jpeg'),
(5, 'Suzany Silva', 'suzany_silva', 'suzany_silva@hotmail.com', '66eccf32c43c345b4e4b88bd529dc384', 'suzany_silva.jpg'),
(6, 'Renan Mattos', 'renan_mattos', 'renan_mattos@yahoo.com.br', '66eccf32c43c345b4e4b88bd529dc384', 'renan_mattos.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `admin_logs`
--

CREATE TABLE `admin_logs` (
  `log_id` int(11) NOT NULL,
  `log_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `log_email` varchar(255) NOT NULL,
  `log_action` varchar(64) NOT NULL,
  `log_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `banneds`
--

CREATE TABLE `banneds` (
  `banned_ip` bigint(15) NOT NULL,
  `banned_begin` datetime DEFAULT NULL,
  `banned_end` datetime DEFAULT NULL,
  `banned_amount` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `log_id` int(11) NOT NULL,
  `log_ip` varchar(64) NOT NULL,
  `log_nickname` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `log_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `log_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login_logs`
--

INSERT INTO `login_logs` (`log_id`, `log_ip`, `log_nickname`, `log_password`) VALUES
(6, '127.0.0.1', 'lucas_naja', '123456'),
(7, '127.0.0.1', 'lucas_bittencourt', '654321'),
(8, '127.0.0.1', 'lucasnaja', 'wasd123'),
(9, '127.0.0.1', 'lucasnaj', 'dkajsdjdf'),
(10, '127.0.0.1', 'lucasnaja', 'djkdjdf'),
(11, '127.0.0.1', 'lucasnaja', '1kdfsjdf');

-- --------------------------------------------------------

--
-- Table structure for table `maintenances`
--

CREATE TABLE `maintenances` (
  `maintenance_id` int(11) NOT NULL,
  `maintenance_name` varchar(255) NOT NULL,
  `maintenance_begin` datetime DEFAULT NULL,
  `maintenance_end` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `message_name` varchar(45) NOT NULL,
  `message_email` varchar(45) NOT NULL,
  `message_subject` varchar(45) NOT NULL,
  `message_content` text NOT NULL,
  `message_time` datetime NOT NULL,
  `message_read` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `message_name`, `message_email`, `message_subject`, `message_content`, `message_time`, `message_read`) VALUES
(1, 'Lucas', 'lucasnaja0@gmail.com', 'Outro', 'sfdfafdfadfdfdsfsd', '2019-08-01 08:21:16', 0),
(2, 'Lucas Bittencourt', 'lucasnaja0@gmail.com', 'Outro', 'mensagem do usuário - -----', '2019-08-05 06:49:49', 0),
(3, 'Lucas Bittencourt', 'lucasnaja0@gmail.com', 'Bug (mal funcionamento)', 'teste', '2019-08-05 06:56:33', 1);

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
(2, 'Geradores', 'generators', 'autorenew', 2),
(4, 'Validadores', 'validators', 'check', 2),
(5, 'Funções String', 'string_functions', 'format_color_text', 2),
(6, 'Rede e Internet', 'network_internet', 'wifi', 2),
(7, 'Codif. e Decodif.', 'encoder_decoder', 'textsms', 2),
(8, 'Tabelas e Padrões', 'tables_patterns', 'colorize', 2),
(10, 'Cálculo de Áreas', 'area_calculation', 'compare', 3),
(11, 'Cálculo de Datas', 'date_calculation', 'timer', 3),
(12, 'Calculadoras', 'calculators', 'exposure', 3);

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
  `tool_status` tinyint(1) NOT NULL DEFAULT '1',
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`tool_id`, `tool_name`, `tool_path`, `tool_description`, `tool_link`, `tool_visits`, `tool_status`, `section_id`) VALUES
(7, 'Gerador de CPF', 'cpf_generator', 'Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/CPFGenerator.js', 40, 1, 2),
(8, 'Gerador de Senha', 'password_generator', 'Gerador de Senha Online para gerar senhas personalizadas e fortes.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/passwordGenerator.js', 110, 1, 2),
(9, 'Gerador de Meta Tags', 'meta_tags_generator', 'Gerador de Meta Tags Online, feito para gerar várias das Meta Tags existentes.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/metaTagsGenerator.js', 50, 1, 2),
(11, 'Validador de CPF', 'cpf_validator', 'Validador de CPF Online para validar CPFs para programadores testarem seus softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/validators/CPFValidator.js', 23, 1, 4),
(12, 'Contador de Caracteres', 'characters_count', 'Contador de letras, caracteres sem espaço, palavras, espaços, vogais, consoantes, números e linhas.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/string_functions/charactersCount.js', 15, 1, 5),
(13, 'Meu IP', 'my_ip', 'Veja seu IP e muito mais informações aqui.', 'https://github.com/lucasnaja/4People/blob/master/pages/computation/network_internet/my_ip/src/index.js', 18, 1, 6),
(14, 'Meu Navegador', 'my_browser', 'Veja seu Navegador aqui.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/network_and_internet/myWebBrowser.js', 10, 1, 6),
(15, 'Buscar CEP', 'search_cep', 'Busque informações de seu CEP, como Rua, Cidade, Bairro e Estado aqui.', 'https://github.com/lucasnaja/4People/blob/master/pages/computation/network_internet/search_cep/src/index.js', 18, 1, 6),
(16, 'Binário, Octal e Hexadecimal', 'binary_converter', 'Tradutor Online de Código Binário. Basta digitar o código binário ou texto abaixo e clicar no botão para converter.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/encoders_decoders/binaryConverter.js', 14, 1, 7),
(17, 'Código de Evento das Teclas', 'keycode_event', 'Código de Eventos das Teclas para descobrir cada keyCode da tecla e criar eventos em sua linguagem de preferência.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/tables_and_patterns/jsEventKeyCodes.js', 17, 1, 8),
(18, 'Fatorar Número', 'factorize_number', 'Calculadora Online para Fatorar Números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/factorization.js', 59, 1, 12),
(19, 'Máximo Divisor Comum', 'gcd', 'Calculadora Online para encontrar o Máximo Divisor Comum entre vários números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/GCD.js', 8, 1, 12),
(20, 'Mínimo Múltiplo Comum', 'lcm', 'Calculadora Online para encontrar o Mínimo Múltiplo Comum entre vários números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/LCM.js', 4, 1, 12),
(21, 'Índice de Massa Corporal', 'bmi', 'Calculadora de Índice de Massa Corporal Online para calcular o IMC e o seu peso ideal.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/BMI.js', 4, 1, 12),
(22, 'Porcentagem', 'percentage', 'Calculadora de Porcentagem Online com vários métodos para encontrar a porcentagem, como aumentos, descontos, proporções, etc.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/percentage.js', 4, 1, 12),
(23, 'Equação do 2° Grau', 'bhaskara', 'Cálculo da Equção do 2° Grau (Bhaskara) Online. Δ = B² - 4 * A * C, X = (-B +- √Δ) / 2 * A', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/bhaskara.js', 8, 1, 12),
(24, 'Números Primos', 'prime_numbers', 'Calculadora de Números Primos Online para verificar se número é primo ou não.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/primeNumbers.js', 8, 1, 12),
(25, 'Números Amigáveis', 'friendly_numbers', 'Números amigáveis são pares de números onde um deles é a soma dos divisores do outro.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/friendlyNumbers.js', 5, 1, 12),
(26, 'Fibonacci', 'fibonacci', 'Calculadora para calcular a Sequência de Fibonacci. Ex: 0, 1, 1, 2, 3, 5, 8, 13, etc...', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/fibonacci.js', 5, 1, 12),
(27, 'Conversor de Temperatura', 'temperature_converter', 'Conversor de Temperatura Online para calcular Graus Celsius, Fahrenheit e Kelvin.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/temperatureConversor.js', 5, 1, 12),
(28, 'Divisão e Resto', 'division_rest', 'Calculadora de Divisão Online que mostra o resultado da divisão comum e inteira entre dois números e o resto (módulo) entre eles.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/divisionAndRest.js', 6, 1, 12),
(29, 'Área do Círculo', 'circle_area', 'Calculador de Área do Círculo Online. R = Raio, D = Diâmetro (2 * R), PI = 3.141592653589793... (Math.PI.toFixed(48))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circleArea.js', 26, 1, 10),
(30, 'Área do Quadrado', 'square_area', 'Calculador de Área do Quadrado Online. Área do Quadrado = Lado * Lado ou L²', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/squareArea.js', 11, 1, 10),
(31, 'Área do Retângulo', 'rectangle_area', 'Calculador de Área do Retângulo Online. Área do Retângulo = Base * Altura', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/rectangleArea.js', 7, 1, 10),
(32, 'Área do Triângulo', 'triangle_area', 'Calculador de Área do Triângulo Online. Área do Triângulo = Base * Altura / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/triangleArea.js', 7, 1, 10),
(33, 'Área do Pentágono', 'pentagon_area', 'Calculador de Área do Pentágono Online. Área do Pentágono = (5 * Lado²) / (4 * tan(36°))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/pentagonArea.js', 9, 1, 10),
(34, 'Área do Hexágono', 'hexagon_area', 'Calculador de Área do Hexágono Online. Área do Hexágono = (6 * Lado²) / (4 * tan(30°))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/hexagonArea.js', 2, 1, 10),
(35, 'Área do Polígono Regular', 'regular_polygon_area', 'Calculador de Área do Polígono Regular Online. π = PI, Área do Polígono Regular = (Lado² * Qntd de Lados) / (4 * tan(π / 10))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/regularPolygonArea.js', 2, 1, 10),
(36, 'Área do Losango', 'diamond_area', 'Calculador de Área do Losango Online. Área do Losango = (Diagonal1 * Diagonal2) / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/diamondArea.js', 2, 1, 10),
(37, 'Área do Trapézio', 'trapeze_area', 'Calculador de Área do Trapézio Online. B = Base maior, b = Base menor, A = Altura, Área do Trapézio = (B + b) * A / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/trapezoidArea.js', 2, 1, 10),
(38, 'Área do Paralelogramo', 'parallelogram_area', 'Calculador de Área do Paralelogramo Online. Área do Paralelogramo = Base * Altura', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/parallelogramArea.js', 2, 1, 10),
(39, 'Área da Elipse', 'ellipse_area', 'Calculador de Área da Elipse Online. π = PI, Área da Elipse = π * Eixo maior * Eixo menor', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/ellipseArea.js', 3, 1, 10),
(40, 'Área da Coroa Ciricular', 'circular_crown_area', 'Calculador de Área da Coroa Circular Online. π = PI, R = Raio maior, r = Raio menor, Área da Coroa Circular = π * (R² - r²)', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circularCrownArea.js', 4, 1, 10),
(41, 'Área do Setor Circular', 'circular_sector_area', 'Calculador de Área do Setor Circular Online. π = PI, Área do Setor Circular = π * (Raio² * Ângulo) / 360', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circularSectorArea.js', 2, 1, 10),
(42, 'Diferença entre Datas', 'difference_between_dates', 'Calcular Diferença entre Datas. Possui um leque de recursos disponíveis, como calcular idades, tempo, etc.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/dates_calculator/differenceBetweenDates.js', 122, 1, 11),
(50, 'Gerador de Nomes', 'name_generator', 'Gerador de Nomes online e gratuito para gerar diversos tipos de nomes', '', 3, 0, 2),
(51, 'Gerador de Nicks', 'nick_generator', 'Gerador de Nicks online para gerar diversos tipos de nicknames', '', 2, 0, 2);

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
(2, 'Computação', 'computation', 'computer'),
(3, 'Matemática', 'math', 'functions');

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
-- Indexes for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `banneds`
--
ALTER TABLE `banneds`
  ADD PRIMARY KEY (`banned_ip`);

--
-- Indexes for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `maintenances`
--
ALTER TABLE `maintenances`
  ADD PRIMARY KEY (`maintenance_id`),
  ADD UNIQUE KEY `maintenance_name` (`maintenance_name`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `admin_logs`
--
ALTER TABLE `admin_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `maintenances`
--
ALTER TABLE `maintenances`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `tool_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
