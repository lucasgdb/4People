-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 03, 2019 at 01:28 AM
-- Server version: 8.0.18
-- PHP Version: 7.2.22

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
(8, 'Renan Mattos', 'renan_mattos', 'renan_mattos@yahoo.com.br', '66eccf32c43c345b4e4b88bd529dc384', 'renan_mattos.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `admin_logs`
--

CREATE TABLE `admin_logs` (
  `log_id` int(11) NOT NULL,
  `log_action` varchar(64) NOT NULL,
  `log_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_logs`
--

INSERT INTO `admin_logs` (`log_id`, `log_action`, `log_createdAt`, `admin_id`) VALUES
(3, 'insert.administrator', '2019-10-27 01:41:38', 4),
(4, 'delete.administrator', '2019-10-27 01:41:54', 4),
(5, 'insert.administrator', '2019-10-27 01:47:46', 4),
(6, 'update.administrator', '2019-10-27 01:47:56', 4),
(7, 'insert.schedule', '2019-10-27 01:53:25', 4),
(8, 'update.schedule', '2019-10-27 01:53:37', 4),
(9, 'delete.schedule', '2019-10-27 01:53:43', 4),
(10, 'delete.message', '2019-10-27 02:38:07', 4),
(12, 'update.message.unread', '2019-10-27 02:54:13', 4),
(13, 'update.message.read', '2019-10-27 02:54:15', 4),
(14, 'update.message.sent_email', '2019-10-27 02:54:23', 4),
(15, 'insert.schedule', '2019-10-27 02:57:48', 5),
(16, 'delete.schedule', '2019-10-27 02:57:56', 5),
(17, 'update.message.unread', '2019-10-28 02:22:01', 4),
(18, 'insert.tool', '2019-10-28 03:26:35', 4),
(19, 'insert.tool', '2019-10-28 03:34:03', 4),
(20, 'update.tool', '2019-10-28 03:45:42', 4),
(21, 'update.tool', '2019-10-28 04:18:14', 4),
(22, 'insert.tool', '2019-10-28 17:41:17', 4),
(23, 'insert.tool', '2019-10-28 18:00:11', 4),
(24, 'delete.tool', '2019-10-28 18:01:53', 4),
(25, 'insert.tool', '2019-10-28 18:49:42', 4),
(26, 'insert.tool', '2019-10-28 18:50:07', 4),
(27, 'update.tool', '2019-10-28 18:50:39', 4),
(28, 'update.tool', '2019-10-28 18:50:44', 4),
(29, 'update.tool', '2019-10-28 18:51:00', 4),
(30, 'update.tool', '2019-10-28 20:19:12', 4),
(31, 'insert.tool', '2019-10-28 22:32:16', 4),
(32, 'update.tool', '2019-10-28 22:51:26', 4),
(33, 'update.tool', '2019-10-28 22:51:37', 4),
(34, 'update.tool', '2019-10-28 22:52:15', 4),
(35, 'insert.tool', '2019-10-28 22:52:24', 4),
(36, 'update.tool', '2019-10-28 22:52:47', 4),
(37, 'update.tool', '2019-10-28 22:56:06', 4),
(38, 'update.tool', '2019-10-28 22:56:18', 4),
(39, 'update.section', '2019-10-29 16:16:00', 4),
(40, 'update.section', '2019-10-29 16:24:24', 4),
(41, 'delete.message', '2019-10-29 16:31:12', 4),
(42, 'update.message.read', '2019-10-29 16:31:25', 4),
(43, 'update.message.unread', '2019-10-29 16:31:28', 4),
(44, 'update.message.read', '2019-10-29 16:42:34', 4),
(45, 'delete.message', '2019-10-31 00:51:52', 4),
(46, 'update.message.read', '2019-10-31 01:16:18', 4),
(47, 'update.message.unread', '2019-10-31 01:16:31', 4),
(48, 'delete.message', '2019-10-31 01:16:33', 4),
(49, 'update.tool', '2019-11-01 12:28:05', 4),
(50, 'update.administrator', '2019-11-01 12:28:22', 4),
(51, 'update.message.read', '2019-11-01 12:50:03', 4),
(52, 'update.message.unread', '2019-11-01 12:50:08', 4),
(53, 'insert.schedule', '2019-11-01 12:50:48', 4),
(54, 'delete.schedule', '2019-11-01 12:51:16', 4),
(55, 'update.message.read', '2019-11-01 23:11:26', 4),
(56, 'update.message.unread', '2019-11-01 23:11:30', 4),
(57, 'insert.schedule', '2019-11-01 23:13:04', 4),
(58, 'delete.schedule', '2019-11-01 23:13:41', 4),
(59, 'update.message.read', '2019-11-01 23:36:13', 4),
(60, 'update.message.unread', '2019-11-01 23:36:22', 4),
(61, 'insert.schedule', '2019-11-01 23:37:52', 4),
(62, 'delete.schedule', '2019-11-01 23:38:22', 4),
(63, 'delete.tool', '2019-11-02 18:41:58', 4),
(64, 'delete.tool', '2019-11-02 18:42:01', 4),
(65, 'delete.tool', '2019-11-02 18:42:06', 4),
(66, 'delete.tool', '2019-11-02 18:42:08', 4),
(67, 'delete.tool', '2019-11-02 18:42:09', 4),
(68, 'delete.tool', '2019-11-02 18:42:11', 4),
(69, 'insert.post', '2019-11-02 20:09:35', 4),
(70, 'insert.post', '2019-11-02 20:11:08', 4),
(71, 'insert.post', '2019-11-02 20:21:13', 4),
(72, 'delete.post', '2019-11-02 20:21:19', 4),
(73, 'insert.post', '2019-11-02 20:23:33', 4),
(74, 'delete.post', '2019-11-02 21:29:27', 4),
(75, 'insert.post', '2019-11-02 22:36:53', 4),
(76, 'insert.schedule', '2019-11-02 22:45:43', 4),
(77, 'update.post', '2019-11-02 23:13:29', 4),
(78, 'update.post', '2019-11-02 23:13:34', 4),
(79, 'update.post', '2019-11-02 23:13:39', 4),
(80, 'update.post', '2019-11-02 23:13:41', 4),
(81, 'update.post', '2019-11-02 23:13:46', 4),
(82, 'update.post', '2019-11-02 23:13:49', 4),
(83, 'update.post', '2019-11-02 23:14:39', 4),
(84, 'update.post', '2019-11-02 23:15:31', 4),
(85, 'update.post', '2019-11-02 23:16:00', 4),
(86, 'update.post', '2019-11-02 23:21:06', 4),
(87, 'update.post', '2019-11-02 23:21:50', 4),
(88, 'update.post', '2019-11-02 23:22:15', 4),
(89, 'update.post', '2019-11-02 23:23:07', 4),
(90, 'update.post', '2019-11-02 23:23:42', 4),
(91, 'update.post', '2019-11-02 23:24:15', 4),
(92, 'update.post', '2019-11-02 23:24:26', 4),
(93, 'update.post', '2019-11-02 23:25:37', 4),
(94, 'update.post', '2019-11-02 23:25:58', 4),
(95, 'update.post', '2019-11-02 23:28:50', 4),
(96, 'update.post', '2019-11-02 23:28:54', 4),
(97, 'update.post', '2019-11-02 23:29:13', 4),
(98, 'update.post', '2019-11-02 23:29:34', 4),
(99, 'update.post', '2019-11-02 23:31:23', 4),
(100, 'update.post', '2019-11-02 23:32:45', 4),
(101, 'update.post', '2019-11-02 23:32:50', 4),
(102, 'delete.post', '2019-11-02 23:34:54', 4),
(103, 'insert.post', '2019-11-02 23:35:57', 4),
(104, 'delete.post', '2019-11-02 23:36:50', 4),
(105, 'insert.post', '2019-11-02 23:37:08', 4),
(106, 'delete.post', '2019-11-02 23:37:17', 4),
(107, 'insert.post', '2019-11-02 23:37:54', 4),
(108, 'delete.post', '2019-11-02 23:38:48', 4),
(109, 'insert.post', '2019-11-02 23:40:31', 4),
(110, 'delete.post', '2019-11-02 23:40:36', 4),
(111, 'update.post', '2019-11-02 23:42:40', 4),
(112, 'update.post', '2019-11-02 23:44:01', 4),
(113, 'update.post', '2019-11-02 23:44:09', 4),
(114, 'update.post', '2019-11-02 23:44:57', 4),
(115, 'update.post', '2019-11-02 23:45:01', 4),
(116, 'update.post', '2019-11-02 23:45:47', 4),
(117, 'update.post', '2019-11-02 23:48:08', 4),
(118, 'update.post', '2019-11-02 23:49:48', 4),
(119, 'update.post', '2019-11-02 23:53:47', 4),
(120, 'insert.post', '2019-11-02 23:55:46', 4),
(121, 'delete.schedule', '2019-11-02 23:56:19', 4),
(122, 'delete.post', '2019-11-02 23:59:32', 4),
(123, 'delete.post', '2019-11-02 23:59:34', 4),
(124, 'insert.post', '2019-11-03 00:27:58', 4),
(125, 'update.post', '2019-11-03 00:33:02', 4),
(126, 'insert.post', '2019-11-03 01:15:13', 4),
(127, 'delete.post', '2019-11-03 01:15:21', 4),
(128, 'insert.post', '2019-11-03 01:16:30', 4),
(129, 'delete.post', '2019-11-03 01:16:34', 4),
(130, 'insert.post', '2019-11-03 01:16:44', 4),
(131, 'delete.post', '2019-11-03 01:16:59', 4),
(132, 'insert.post', '2019-11-03 01:22:03', 4),
(133, 'delete.post', '2019-11-03 01:24:39', 4),
(134, 'update.post', '2019-11-03 01:27:20', 4);

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

INSERT INTO `login_logs` (`log_id`, `log_ip`, `log_nickname`, `log_password`, `log_createdAt`) VALUES
(6, '127.0.0.1', 'lucas_naja', '123456', '2019-10-19 19:28:41'),
(7, '127.0.0.1', 'lucas_bittencourt', '654321', '2019-10-19 19:28:41'),
(8, '127.0.0.1', 'lucasnaja', 'wasd123', '2019-10-19 19:28:41'),
(9, '127.0.0.1', 'lucasnaj', 'dkajsdjdf', '2019-10-19 19:28:41'),
(10, '127.0.0.1', 'lucasnaja', 'djkdjdf', '2019-10-19 19:28:41'),
(11, '127.0.0.1', 'lucasnaja', '1kdfsjdf', '2019-10-19 19:28:41'),
(12, '127.0.0.1', 'lucasnaja', '123466', '2019-11-01 20:14:11');

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
(77, 'Lucas Bittencourt', 'lucasnaja0@gmail.com', 'Bug (mal funcionamento)', 'Há um bug na ferramenta de Fibonacci. (Não está sendo gerado os números da sequência)', '2019-10-26 23:39:06', 0),
(78, 'Lucas Bittencourt', 'lucasnaja0@gmail.com', 'Sugestão (visual)', 'Olá, mundo', '2019-10-30 21:51:40', 0),
(79, 'Suzany Silva', 'suzany_silva@hotmail.com', 'Outro', 'Hello world', '2019-10-30 21:52:40', 0),
(81, 'renan', 'nan.marchioelino@hotmail.com', 'Outro', 'Olá Mundo!!', '2019-11-01 20:30:03', 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_title` varchar(64) NOT NULL,
  `post_image` varchar(255) NOT NULL,
  `post_description` varchar(255) NOT NULL,
  `post_content` text NOT NULL,
  `post_visits` bigint(20) NOT NULL DEFAULT '0',
  `post_status` int(1) NOT NULL DEFAULT '1',
  `post_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_title`, `post_image`, `post_description`, `post_content`, `post_visits`, `post_status`, `post_createdAt`, `admin_id`) VALUES
(25, 'Lançamento', 'Lançamento.jpg', 'Lançamento do 4People', '<h1>4People lançado!</h1><p><br></p><blockquote>Hoje, dia 02 de Novembro, depois de muito suor, foi lançado a primeira versão do 4People ao público. O planejamento do 4People começou em maio/2019!</blockquote><p><br></p><h2>Como a ideia surgiu?</h2><p><br></p><p>O <strong>4People</strong> foi pensado mais ou menos em <u>2014</u>, que foi o ano em que eu, <em>Lucas Bittencourt</em>, Administrador do <strong>4People</strong>, conheceu o <em>4Devs</em> (concorrente direto do <em>4People</em>), desde então ficou em sua memória o quanto queria produzir algo do tipo, mas não tinha o conhecimento necessário. <em>Lucas</em> no começo de sua jornada no Desenvolvimento de Software, sempre fez projetos pessoais baseados em sites que já existiam (para ter uma base). O 4Devs foi um deles. Mas, como não tinha o conhecimento necessário para produzir algo do tipo, deixou de lado.</p><p><br></p><p>Na <u>Etec</u> de Guaratinguetá, ele teve essa ideia novamente (mais ou menos em Novembro de 2018), de produzir algo parecido com 4Devs.</p><p><br></p><h2>Por que <strong>4People</strong>?</h2><p><br></p><p>Como o nome 4Devs tem o significado \"para Devs\", a equipe do 4People pensou em algo não só para Devs, e sim para <u>pessoas</u>. Foi aí que surgiu o <strong><u>4People</u></strong>.</p><p><br></p><h2>Como foi o processo?</h2><p><br></p><p>O 4People passou por várias mudanças ao decorrer do tempo, tanto visuais, como também de linguagem, frameworks, bibliotecas, entre outros.</p>', 0, 1, '2019-11-03 00:27:58', 4);

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
(7, 'Codific. e Decodific.', 'encoder_decoder', 'textsms', 2),
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
(7, 'Gerador de CPF', 'cpf_generator', 'Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/CPFGenerator.js', 72, 1, 2),
(8, 'Gerador de Senha', 'password_generator', 'Gerador de Senha Online para gerar senhas personalizadas e fortes.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/passwordGenerator.js', 224, 1, 2),
(9, 'Gerador de Meta Tags', 'meta_tags_generator', 'Gerador de Meta Tags Online, feito para gerar várias das Meta Tags existentes.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/metaTagsGenerator.js', 59, 1, 2),
(11, 'Validador de CPF', 'cpf_validator', 'Validador de CPF Online para validar CPFs para programadores testarem seus softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/validators/CPFValidator.js', 40, 1, 4),
(12, 'Contador de Caracteres', 'characters_count', 'Contador de letras, caracteres sem espaço, palavras, espaços, vogais, consoantes, números e linhas.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/string_functions/charactersCount.js', 25, 1, 5),
(13, 'Meu IP', 'my_ip', 'Veja seu IP e muito mais informações aqui.', 'https://github.com/lucasnaja/4People/blob/master/pages/computation/network_internet/my_ip/src/index.js', 40, 1, 6),
(14, 'Meu Navegador', 'my_browser', 'Veja seu Navegador aqui.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/network_and_internet/myWebBrowser.js', 18, 1, 6),
(15, 'Buscar CEP', 'search_cep', 'Busque informações de seu CEP, como Rua, Cidade, Bairro e Estado aqui.', 'https://github.com/lucasnaja/4People/blob/master/pages/computation/network_internet/search_cep/src/index.js', 47, 1, 6),
(16, 'Binário, Octal e Hexadecimal', 'binary_converter', 'Tradutor Online de Código Binário. Basta digitar o código binário ou texto abaixo e clicar no botão para converter.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/encoders_decoders/binaryConverter.js', 23, 1, 7),
(17, 'Código de Evento das Teclas', 'keycode_event', 'Código de Eventos das Teclas para descobrir cada keyCode da tecla e criar eventos em sua linguagem de preferência.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/tables_and_patterns/jsEventKeyCodes.js', 37, 1, 8),
(18, 'Fatorar Número', 'factorize_number', 'Calculadora Online para Fatorar Números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/factorization.js', 78, 1, 12),
(19, 'Máximo Divisor Comum', 'gcd', 'Calculadora Online para encontrar o Máximo Divisor Comum entre vários números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/GCD.js', 10, 1, 12),
(20, 'Mínimo Múltiplo Comum', 'lcm', 'Calculadora Online para encontrar o Mínimo Múltiplo Comum entre vários números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/LCM.js', 4, 1, 12),
(21, 'Índice de Massa Corporal', 'bmi', 'Calculadora de Índice de Massa Corporal Online para calcular o IMC e o seu peso ideal.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/BMI.js', 4, 1, 12),
(22, 'Porcentagem', 'percentage', 'Calculadora de Porcentagem Online com vários métodos para encontrar a porcentagem, como aumentos, descontos, proporções, etc.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/percentage.js', 24, 1, 12),
(23, 'Equação do 2° Grau', 'bhaskara', 'Cálculo da Equção do 2° Grau (Bhaskara) Online. Δ = B² - 4 * A * C, X = (-B +- √Δ) / 2 * A', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/bhaskara.js', 9, 1, 12),
(24, 'Números Primos', 'prime_numbers', 'Calculadora de Números Primos Online para verificar se número é primo ou não.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/primeNumbers.js', 10, 1, 12),
(25, 'Números Amigáveis', 'friendly_numbers', 'Números amigáveis são pares de números onde um deles é a soma dos divisores do outro.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/friendlyNumbers.js', 5, 1, 12),
(26, 'Fibonacci', 'fibonacci', 'Calculadora para calcular a Sequência de Fibonacci. Ex: 0, 1, 1, 2, 3, 5, 8, 13, entre outros...', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/fibonacci.js', 6, 1, 12),
(27, 'Conversor de Temperatura', 'temperature_converter', 'Conversor de Temperatura Online para calcular Graus Celsius, Fahrenheit e Kelvin.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/temperatureConversor.js', 5, 1, 12),
(28, 'Divisão e Resto', 'division_rest', 'Calculadora de Divisão Online que mostra o resultado da divisão comum e inteira entre dois números e o resto (módulo) entre eles.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/divisionAndRest.js', 7, 1, 12),
(29, 'Área do Círculo', 'circle_area', 'Calculador de Área do Círculo Online. R = Raio, D = Diâmetro (2 * R), PI = 3.141592653589793... (Math.PI.toFixed(48))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circleArea.js', 48, 1, 10),
(30, 'Área do Quadrado', 'square_area', 'Calculador de Área do Quadrado Online. Área do Quadrado = Lado * Lado ou L²', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/squareArea.js', 20, 1, 10),
(31, 'Área do Retângulo', 'rectangle_area', 'Calculador de Área do Retângulo Online. Área do Retângulo = Base * Altura', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/rectangleArea.js', 8, 1, 10),
(32, 'Área do Triângulo', 'triangle_area', 'Calculador de Área do Triângulo Online. Área do Triângulo = Base * Altura / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/triangleArea.js', 8, 1, 10),
(33, 'Área do Pentágono', 'pentagon_area', 'Calculador de Área do Pentágono Online. Área do Pentágono = (5 * Lado²) / (4 * tan(36°))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/pentagonArea.js', 11, 1, 10),
(34, 'Área do Hexágono', 'hexagon_area', 'Calculador de Área do Hexágono Online. Área do Hexágono = (6 * Lado²) / (4 * tan(30°))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/hexagonArea.js', 3, 1, 10),
(35, 'Área do Polígono Regular', 'regular_polygon_area', 'Calculador de Área do Polígono Regular Online. π = PI, Área do Polígono Regular = (Lado² * Qntd de Lados) / (4 * tan(π / 10))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/regularPolygonArea.js', 4, 1, 10),
(36, 'Área do Losango', 'diamond_area', 'Calculador de Área do Losango Online. Área do Losango = (Diagonal1 * Diagonal2) / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/diamondArea.js', 3, 1, 10),
(37, 'Área do Trapézio', 'trapeze_area', 'Calculador de Área do Trapézio Online. B = Base maior, b = Base menor, A = Altura, Área do Trapézio = (B + b) * A / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/trapezoidArea.js', 3, 1, 10),
(38, 'Área do Paralelogramo', 'parallelogram_area', 'Calculador de Área do Paralelogramo Online. Área do Paralelogramo = Base * Altura', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/parallelogramArea.js', 3, 1, 10),
(39, 'Área da Elipse', 'ellipse_area', 'Calculador de Área da Elipse Online. π = PI, Área da Elipse = π * Eixo maior * Eixo menor', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/ellipseArea.js', 4, 1, 10),
(40, 'Área da Coroa Ciricular', 'circular_crown_area', 'Calculador de Área da Coroa Circular Online. π = PI, R = Raio maior, r = Raio menor, Área da Coroa Circular = π * (R² - r²)', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circularCrownArea.js', 5, 1, 10),
(41, 'Área do Setor Circular', 'circular_sector_area', 'Calculador de Área do Setor Circular Online. π = PI, Área do Setor Circular = π * (Raio² * Ângulo) / 360', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circularSectorArea.js', 3, 1, 10),
(42, 'Diferença entre Datas', 'difference_between_dates', 'Calcular Diferença entre Datas. Possui um leque de recursos disponíveis, como calcular idades, tempo, etc.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/dates_calculator/differenceBetweenDates.js', 162, 1, 11),
(50, 'Gerador de Nomes', 'name_generator', 'Gerador de Nomes online e gratuito para gerar diversos tipos de nomes.', '', 9, 1, 2),
(52, 'Tabela ASCII', 'ascii_table', 'Lista de códigos padrões da tabela ASC II.', 'https://github.com/lucasnaja/4People/tree/master/pages/computation/tables_patterns/ascii_table', 11, 1, 8),
(53, 'Inverter Texto', 'reverse_text', 'Inversor de Texto online do 4People', 'https://github.com/lucasnaja/4People/tree/master/assets/algorithms/string_functions/reverseText.js', 7, 1, 5),
(54, 'Gerador de RG', 'rg_generator', 'Gerador de RG Online para Programadores testarem seus Softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/RGGenerator.js', 14, 1, 2),
(55, 'Gerador de CNPJ', 'cnpj_generator', 'Gerador de CNPJ Online para Programadores testarem seus Softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/CNPJGenerator.js', 9, 1, 2),
(56, 'Validador de RG', 'rg_validator', 'Validador de RG Online para validar RGs para programadores testarem seus softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/validators/RGValidator.js', 12, 1, 4),
(57, 'Validador de CNPJ', 'cnpj_validator', 'Validador de CNPJ Online para validar CNPJs para programadores testarem seus softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/validators/CNPJValidator.js', 7, 1, 4),
(58, 'Somar em Data', 'add_in_date', 'Some dias, semanas, meses ou anos em uma Data.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/dates_calculator/addInDate.js', 4, 1, 11),
(59, 'Subtrair em Data', 'subtract_in_date', 'Subtraia dias, semanas, meses ou anos de uma Data.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/dates_calculator/subtractInDate.js', 2, 1, 11);

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
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `admin_id` (`admin_id`);

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
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD UNIQUE KEY `post_title` (`post_title`),
  ADD KEY `admin_id` (`admin_id`);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `admin_logs`
--
ALTER TABLE `admin_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `maintenances`
--
ALTER TABLE `maintenances`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `tool_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD CONSTRAINT `admin_logs_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`);

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
