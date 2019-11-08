-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 08, 2019 at 04:18 PM
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
  `admin_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin_nickname` varchar(28) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin_password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `log_action` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `log_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(134, 'update.post', '2019-11-03 01:27:20', 4),
(135, 'insert.post', '2019-11-03 01:34:16', 4),
(136, 'insert.post', '2019-11-03 01:34:24', 4),
(137, 'insert.post', '2019-11-03 01:34:30', 4),
(138, 'insert.post', '2019-11-03 01:34:36', 4),
(139, 'insert.post', '2019-11-03 01:34:43', 4),
(140, 'insert.post', '2019-11-03 01:34:51', 4),
(141, 'update.post', '2019-11-03 01:37:04', 4),
(142, 'delete.post', '2019-11-03 01:39:33', 4),
(143, 'delete.post', '2019-11-03 01:39:35', 4),
(144, 'delete.post', '2019-11-03 01:39:37', 4),
(145, 'delete.post', '2019-11-03 01:39:38', 4),
(146, 'delete.post', '2019-11-03 01:39:41', 4),
(147, 'update.post', '2019-11-03 02:13:10', 4),
(148, 'update.post', '2019-11-03 02:13:18', 4),
(149, 'update.post', '2019-11-03 02:16:24', 4),
(150, 'update.post', '2019-11-03 02:16:39', 4),
(151, 'update.post', '2019-11-03 02:17:42', 4),
(152, 'insert.post', '2019-11-03 02:19:34', 4),
(153, 'delete.post', '2019-11-03 02:19:57', 4),
(154, 'update.post', '2019-11-03 02:40:24', 4),
(155, 'update.post', '2019-11-03 02:41:12', 4),
(156, 'update.post', '2019-11-03 02:44:08', 4),
(157, 'update.post', '2019-11-03 02:48:14', 4),
(158, 'insert.post', '2019-11-03 02:48:57', 4),
(159, 'update.post', '2019-11-03 02:49:13', 4),
(160, 'delete.post', '2019-11-03 02:49:21', 4),
(161, 'update.post', '2019-11-03 05:21:05', 4),
(162, 'update.post', '2019-11-03 05:21:19', 4),
(163, 'update.post', '2019-11-03 05:43:18', 4),
(164, 'update.post', '2019-11-03 05:58:10', 4),
(165, 'update.post', '2019-11-03 05:58:22', 4),
(166, 'update.post', '2019-11-03 06:04:53', 4),
(167, 'update.post', '2019-11-03 06:05:41', 4),
(168, 'update.post', '2019-11-03 06:19:29', 4),
(169, 'update.post', '2019-11-03 06:21:05', 4),
(170, 'update.post', '2019-11-03 06:23:41', 4),
(171, 'update.post', '2019-11-03 13:59:59', 4),
(172, 'update.post', '2019-11-03 14:00:19', 4),
(173, 'insert.post', '2019-11-03 14:01:28', 4),
(174, 'update.post', '2019-11-03 14:02:36', 4),
(175, 'update.post', '2019-11-03 14:02:50', 4),
(176, 'update.post', '2019-11-03 14:03:26', 4),
(177, 'update.post', '2019-11-03 14:03:55', 4),
(178, 'delete.post', '2019-11-03 14:04:07', 4),
(179, 'update.post', '2019-11-03 14:13:43', 4),
(180, 'update.post', '2019-11-03 14:14:02', 4),
(181, 'update.post', '2019-11-03 14:14:45', 4),
(182, 'update.type', '2019-11-03 14:14:51', 4),
(183, 'update.type', '2019-11-03 14:14:53', 4),
(184, 'update.post', '2019-11-03 14:15:03', 4),
(185, 'update.post', '2019-11-03 14:15:35', 4),
(186, 'update.post', '2019-11-03 14:15:37', 4),
(187, 'update.post', '2019-11-03 14:15:48', 4),
(188, 'update.post', '2019-11-03 14:17:50', 4),
(189, 'update.post', '2019-11-03 14:21:23', 4),
(190, 'insert.schedule', '2019-11-03 14:39:01', 4),
(191, 'delete.schedule', '2019-11-03 14:39:29', 4),
(192, 'insert.schedule', '2019-11-03 14:43:03', 4),
(193, 'delete.schedule', '2019-11-03 14:56:04', 4),
(194, 'update.post', '2019-11-03 17:22:33', 4),
(195, 'update.post', '2019-11-03 17:23:43', 4),
(196, 'update.post', '2019-11-03 17:24:45', 4),
(197, 'update.post', '2019-11-03 17:27:10', 4),
(198, 'update.post', '2019-11-03 17:27:22', 4),
(199, 'insert.post', '2019-11-03 17:41:57', 4),
(200, 'update.post', '2019-11-03 17:52:59', 4),
(201, 'update.post', '2019-11-03 17:56:00', 4),
(202, 'update.post', '2019-11-03 17:56:32', 4),
(203, 'update.post', '2019-11-03 17:57:09', 4),
(204, 'update.post', '2019-11-03 17:57:46', 4),
(205, 'update.post', '2019-11-03 17:58:33', 4),
(206, 'update.post', '2019-11-03 18:09:13', 4),
(207, 'update.post', '2019-11-03 18:12:45', 4),
(208, 'update.post', '2019-11-03 18:35:55', 4),
(209, 'update.post', '2019-11-03 18:36:08', 4),
(210, 'update.post', '2019-11-03 18:36:49', 4),
(211, 'update.post', '2019-11-03 18:41:53', 4),
(212, 'update.post', '2019-11-03 18:45:13', 4),
(213, 'insert.post', '2019-11-03 18:59:22', 4),
(214, 'insert.post', '2019-11-03 18:59:49', 4),
(215, 'insert.post', '2019-11-03 19:00:13', 4),
(216, 'insert.post', '2019-11-03 19:00:34', 4),
(217, 'delete.post', '2019-11-03 19:17:35', 4),
(218, 'delete.post', '2019-11-03 19:17:38', 4),
(219, 'delete.post', '2019-11-03 19:17:40', 4),
(220, 'delete.post', '2019-11-03 19:17:42', 4),
(221, 'update.post', '2019-11-03 23:43:32', 4),
(222, 'update.post', '2019-11-03 23:46:14', 4),
(223, 'update.post', '2019-11-03 23:47:18', 4),
(224, 'insert.post', '2019-11-04 00:12:09', 4),
(225, 'update.post', '2019-11-04 00:18:37', 4),
(226, 'update.post', '2019-11-04 00:19:15', 4),
(227, 'update.post', '2019-11-04 00:50:01', 4),
(228, 'update.post', '2019-11-04 00:50:10', 4),
(229, 'update.post', '2019-11-04 01:02:40', 4),
(230, 'update.post', '2019-11-04 01:22:45', 4),
(231, 'update.post', '2019-11-04 01:27:00', 4),
(232, 'update.post', '2019-11-04 02:00:41', 4),
(233, 'insert.post', '2019-11-04 02:05:59', 4),
(234, 'insert.post', '2019-11-04 02:13:11', 4),
(235, 'delete.post', '2019-11-04 02:13:17', 4),
(236, 'delete.post', '2019-11-04 02:19:14', 4),
(237, 'insert.post', '2019-11-04 02:25:23', 4),
(238, 'delete.post', '2019-11-04 02:26:04', 4),
(239, 'insert.post', '2019-11-04 02:26:13', 4),
(240, 'delete.post', '2019-11-04 02:30:45', 4),
(241, 'update.post', '2019-11-04 02:55:37', 4),
(242, 'update.post', '2019-11-04 02:56:36', 4),
(243, 'update.post', '2019-11-04 02:58:40', 4),
(244, 'update.post', '2019-11-04 02:58:46', 4),
(245, 'update.post', '2019-11-04 02:59:01', 4),
(246, 'update.post', '2019-11-04 03:15:43', 4),
(247, 'update.post', '2019-11-04 03:15:54', 4),
(248, 'update.post', '2019-11-04 03:15:55', 4),
(249, 'update.post', '2019-11-04 03:16:00', 4),
(250, 'update.post', '2019-11-04 03:16:09', 4),
(251, 'update.administrator', '2019-11-04 03:20:58', 4),
(252, 'update.administrator', '2019-11-04 03:21:00', 4),
(253, 'update.administrator', '2019-11-04 03:21:06', 4),
(254, 'update.post', '2019-11-04 06:18:50', 4),
(255, 'insert.post', '2019-11-04 06:27:32', 4),
(256, 'insert.post', '2019-11-04 06:28:30', 4),
(257, 'delete.post', '2019-11-04 06:31:05', 4),
(258, 'update.post', '2019-11-04 06:38:50', 4),
(259, 'update.post', '2019-11-04 06:42:14', 4),
(260, 'update.post', '2019-11-04 07:15:00', 4),
(261, 'update.post', '2019-11-04 14:55:57', 4),
(262, 'update.post', '2019-11-04 14:56:07', 4),
(263, 'insert.post', '2019-11-04 15:07:29', 4),
(264, 'delete.post', '2019-11-04 15:07:53', 4),
(265, 'update.post', '2019-11-04 15:11:40', 4),
(266, 'update.post', '2019-11-04 16:46:19', 4),
(267, 'update.post', '2019-11-04 16:46:34', 4),
(268, 'update.post', '2019-11-04 18:37:15', 4),
(269, 'update.post', '2019-11-04 18:37:33', 4),
(270, 'delete.message', '2019-11-04 23:00:59', 4),
(271, 'update.post', '2019-11-04 23:09:20', 4),
(272, 'update.post', '2019-11-04 23:09:35', 4),
(273, 'update.post', '2019-11-05 01:45:57', 4),
(274, 'update.post', '2019-11-05 01:46:07', 4),
(275, 'insert.post', '2019-11-05 01:46:21', 4),
(276, 'update.post', '2019-11-05 01:46:25', 4),
(277, 'insert.post', '2019-11-05 01:46:33', 4),
(278, 'insert.post', '2019-11-05 01:46:40', 4),
(279, 'delete.post', '2019-11-05 01:48:10', 4),
(280, 'delete.post', '2019-11-05 01:48:12', 4),
(281, 'delete.post', '2019-11-05 01:48:13', 4),
(282, 'update.post', '2019-11-05 01:48:21', 4),
(283, 'update.post', '2019-11-05 14:41:16', 4),
(284, 'update.post', '2019-11-05 14:42:54', 4),
(285, 'update.post', '2019-11-05 14:43:01', 4),
(286, 'update.post', '2019-11-05 14:50:05', 4),
(287, 'update.post', '2019-11-05 14:52:27', 4),
(288, 'update.post', '2019-11-05 14:53:19', 4),
(289, 'insert.post', '2019-11-05 14:55:33', 4),
(290, 'insert.post', '2019-11-05 14:55:41', 4),
(291, 'insert.post', '2019-11-05 14:56:10', 4),
(292, 'insert.post', '2019-11-05 14:56:17', 4),
(293, 'insert.post', '2019-11-05 14:56:27', 4),
(294, 'delete.post', '2019-11-05 14:56:30', 4),
(295, 'delete.post', '2019-11-05 14:56:32', 4),
(296, 'delete.post', '2019-11-05 14:56:34', 4),
(297, 'delete.post', '2019-11-05 14:56:35', 4),
(298, 'delete.post', '2019-11-05 14:56:37', 4),
(299, 'update.post', '2019-11-05 14:57:02', 4),
(300, 'update.message.read', '2019-11-05 15:01:08', 4),
(301, 'update.message.unread', '2019-11-05 15:01:12', 4),
(302, 'update.post', '2019-11-05 15:16:46', 4),
(303, 'update.post', '2019-11-05 15:16:55', 4),
(304, 'update.post', '2019-11-05 15:31:15', 4),
(305, 'update.post', '2019-11-05 15:41:04', 4),
(306, 'update.post', '2019-11-05 15:41:11', 4),
(307, 'update.post', '2019-11-05 15:41:27', 4),
(308, 'update.post', '2019-11-05 15:43:12', 4),
(309, 'update.post', '2019-11-05 15:44:34', 4),
(310, 'delete.message', '2019-11-06 04:22:57', 4),
(311, 'update.post', '2019-11-06 04:23:14', 4),
(312, 'update.post', '2019-11-06 04:26:28', 4),
(313, 'update.message.read', '2019-11-06 04:43:15', 4),
(314, 'update.message.unread', '2019-11-06 04:43:44', 4),
(315, 'update.administrator', '2019-11-06 22:49:58', 4),
(316, 'update.administrator', '2019-11-06 22:50:04', 4),
(317, 'update.administrator', '2019-11-06 22:50:10', 4),
(318, 'update.post', '2019-11-07 11:23:37', 4),
(319, 'update.post', '2019-11-07 11:31:41', 4),
(320, 'update.post', '2019-11-07 11:34:50', 4),
(321, 'update.post', '2019-11-07 11:35:22', 4),
(322, 'update.post', '2019-11-07 11:35:39', 4),
(323, 'update.post', '2019-11-07 11:36:13', 4),
(324, 'update.post', '2019-11-07 11:39:02', 4),
(325, 'update.post', '2019-11-07 11:42:20', 4),
(326, 'update.post', '2019-11-07 12:12:21', 4),
(327, 'update.post', '2019-11-07 15:15:40', 4),
(328, 'insert.schedule', '2019-11-07 16:01:19', 4),
(329, 'insert.schedule', '2019-11-07 16:03:04', 4),
(330, 'insert.schedule', '2019-11-07 16:03:37', 4),
(331, 'delete.schedule', '2019-11-07 16:03:48', 4),
(332, 'delete.schedule', '2019-11-07 16:03:51', 4),
(333, 'delete.schedule', '2019-11-07 16:03:53', 4),
(334, 'insert.schedule', '2019-11-07 16:04:14', 4),
(335, 'delete.schedule', '2019-11-07 16:04:20', 4),
(336, 'update.post', '2019-11-07 16:09:13', 4),
(337, 'update.post', '2019-11-07 16:12:28', 4),
(338, 'update.post', '2019-11-07 16:13:06', 4),
(339, 'update.post', '2019-11-07 16:18:37', 4),
(340, 'update.post', '2019-11-07 16:18:54', 4),
(341, 'update.post', '2019-11-07 16:19:17', 4),
(342, 'delete.message', '2019-11-08 00:27:33', 4),
(343, 'insert.post', '2019-11-08 00:40:59', 4),
(344, 'update.post', '2019-11-08 00:41:28', 4),
(345, 'update.post', '2019-11-08 00:41:54', 4),
(346, 'delete.post', '2019-11-08 00:42:19', 4),
(347, 'insert.post', '2019-11-08 01:50:35', 4),
(348, 'update.post', '2019-11-08 01:51:05', 4),
(349, 'delete.post', '2019-11-08 01:51:30', 4),
(350, 'update.post', '2019-11-08 16:13:10', 4);

-- --------------------------------------------------------

--
-- Table structure for table `banneds`
--

CREATE TABLE `banneds` (
  `banned_ip` bigint(15) NOT NULL,
  `banned_begin` datetime DEFAULT NULL,
  `banned_end` datetime DEFAULT NULL,
  `banned_amount` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `log_id` int(11) NOT NULL,
  `log_ip` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `log_nickname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `log_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `log_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(12, '127.0.0.1', 'lucasnaja', '123466', '2019-11-01 20:14:11'),
(13, '127.0.0.1', 'lucasnaja', 'dfddfdf', '2019-11-03 04:08:16'),
(14, '127.0.0.1', 'lucasnaja', 'sffddf', '2019-11-03 04:08:17'),
(15, '127.0.0.1', 'lucasnaja', 'dffsdf', '2019-11-03 04:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `maintenances`
--

CREATE TABLE `maintenances` (
  `maintenance_id` int(11) NOT NULL,
  `maintenance_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `maintenance_begin` datetime DEFAULT NULL,
  `maintenance_end` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `message_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message_email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message_subject` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message_content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message_time` datetime NOT NULL,
  `message_read` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `message_name`, `message_email`, `message_subject`, `message_content`, `message_time`, `message_read`) VALUES
(77, 'Lucas Bittencourt', 'lucasnaja0@gmail.com', 'Bug', 'Há um bug na ferramenta de Fibonacci. (Não está sendo gerado os números da sequência)', '2019-10-26 23:39:06', 0),
(78, 'Lucas Bittencourt', 'lucasnaja0@gmail.com', 'Sugestão', 'Olá, mundo', '2019-10-30 21:51:40', 0),
(82, 'Lucas Bittencourt', 'lucasnaja0@gmail.com', 'Outro', 'Olá, mundo.', '2019-11-06 01:20:14', 0),
(84, 'Renan', 'wveyvqy@gmail.com', 'Outro', 'Olá Mundo!', '2019-11-07 22:45:36', 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_title` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_visits` bigint(20) NOT NULL DEFAULT '0',
  `post_status` int(1) NOT NULL DEFAULT '1',
  `post_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_title`, `post_image`, `post_description`, `post_content`, `post_visits`, `post_status`, `post_createdAt`, `admin_id`) VALUES
(25, 'Lançamento', 'Lançamento.jpg', 'Primeira postagem do 4People', '<h1 class=\"ql-align-center\"><strong>4People publicado!</strong></h1><p><br></p><blockquote><span style=\"color: rgb(68, 68, 68);\">Hoje, dia 02 de Dezembro, depois de muito suor, foi lançado a primeira versão do 4People ao público. O planejamento do 4People começou em Fevereiro de 2019! O TCC é composto por 3 integrantes (1 Desenvolvedor e 2 analistas).</span></blockquote><p><br></p><h2><strong>Como a ideia surgiu?</strong></h2><p><br></p><p class=\"ql-align-justify\"><span style=\"color: rgb(68, 68, 68);\">O </span><em style=\"color: rgb(68, 68, 68);\">4People</em><span style=\"color: rgb(68, 68, 68);\"> foi pensado mais ou menos em 2014, que foi o ano em que o </span><a href=\"https://github.com/lucasnaja\" target=\"_blank\" style=\"color: rgb(0, 102, 204);\">Lucas Bittencourt</a><a href=\"https://github.com/lucasnaja\" target=\"_blank\" style=\"color: rgb(68, 68, 68);\">,</a><span style=\"color: rgb(68, 68, 68);\"> Administrador do </span><em style=\"color: rgb(68, 68, 68);\">4People</em><span style=\"color: rgb(68, 68, 68);\">, conheceu o </span><em style=\"color: rgb(68, 68, 68);\">4Devs</em><span style=\"color: rgb(68, 68, 68);\"> (concorrente direto do </span><em style=\"color: rgb(68, 68, 68);\">4People</em><span style=\"color: rgb(68, 68, 68);\">), desde então ficou em sua memória o quanto queria produzir algo do tipo, mas não tinha o conhecimento necessário. </span><em style=\"color: rgb(68, 68, 68);\">Lucas</em><span style=\"color: rgb(68, 68, 68);\"> no começo de sua jornada no Desenvolvimento de Software, sempre fez projetos pessoais baseados em sites que já existiam (para ter uma base). O </span><em style=\"color: rgb(68, 68, 68);\">4Devs</em><span style=\"color: rgb(68, 68, 68);\"> foi um deles. Mas, como não tinha o conhecimento necessário para produzir algo do tipo, deixou de lado.</span></p><p><br></p><p class=\"ql-align-justify\"><span style=\"color: rgb(68, 68, 68);\">Na Etec de Guaratinguetá, ele teve essa ideia novamente (mais ou menos em Novembro de 2018), de produzir algo parecido com </span><em style=\"color: rgb(68, 68, 68);\">4Devs</em>. <span style=\"color: rgb(68, 68, 68);\">Como o nome 4Devs tem o significado \"para Devs\", a equipe do 4People pensou em algo não só para </span><em style=\"color: rgb(68, 68, 68);\">Desenvolvedores</em><span style=\"color: rgb(68, 68, 68);\">, e sim para p</span><em style=\"color: rgb(68, 68, 68);\">essoas</em><span style=\"color: rgb(68, 68, 68);\">. Foi aí que surgiu o </span><strong style=\"color: rgb(68, 68, 68);\">4People</strong><span style=\"color: rgb(68, 68, 68);\">.</span></p><p class=\"ql-align-justify\"><br></p><h2 class=\"ql-align-justify\"><strong>Por que usar o 4People?</strong></h2><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><span style=\"color: rgb(68, 68, 68);\">O 4People é um </span><strong style=\"color: rgb(68, 68, 68);\">Sistema Web</strong><span style=\"color: rgb(68, 68, 68);\"> que traz vários tipos de ferramentas Computacionais para Desenvolvedores de Softwares e estudantes de informática, assim como ferramentas Matemáticas para alunos e professores. 4People também possui um sistema de Blog totalmente otimizado. Além disso, ele é de código aberto, ou seja, qualquer um pode visualizar seu código fonte, e usá-lo para estudos e até mesmo melhorá-lo.</span></p><p><br></p><h2><strong>Como foi o processo?</strong></h2><p><br></p><p class=\"ql-align-justify\"><span style=\"color: rgb(68, 68, 68);\">O 4People passou por várias mudanças ao decorrer do tempo, tanto visuais, como também de linguagem, frameworks, bibliotecas, entre outros. O processo de produção do 4People foi árduo e demorado, mas com todo o código gerado, foi possível reutilizar parte dele, em vários pedaços do Sistema, asO </span><em style=\"color: rgb(68, 68, 68);\">4People</em><span style=\"color: rgb(68, 68, 68);\"> é um </span><u style=\"color: rgb(68, 68, 68);\">Sistema Web</u><span style=\"color: rgb(68, 68, 68);\"> que traz vários tipos de ferramentas computacionais para Desenvolvedores de Softwares e estudantes de informática, e ferramentas matemáticas para alunos e professores. Mas ele vai muito além disso, 4People possui um sistema de Blog totalmente otimizado. Além disso, ele é de código aberto, ou seja, qualquer um pode visualizar seu código fonte, e usá-lo para estudos e até mesmo melhorá-lo.sim facilitando seu Desenvolvimento. As linguagens utilizadas no Desenvolvimento foram HTML5, CSS3, JavaScript, PHP e MySQL.</span></p><p class=\"ql-align-justify\"><br></p><h2 class=\"ql-align-justify\"><strong>Agradecimentos</strong></h2><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><span style=\"color: rgb(68, 68, 68);\">Foi um prazer fazer parte da primeira turma de Desenvolvimento de Sistemas da Etec de Guaratinguetá. Queremos desejar parabéns a todas as equipes que estão aqui hoje apresentando seus projetos e aos professores pelo carinho e ensino dado. Foram 1 ano e meio de muito aprendizado e amizade.</span></p>', 27, 1, '2019-11-03 00:27:58', 4),
(34, 'Manutenção', 'Manutenção.png', 'Possíveis manutenções serão agendadas aqui', '<blockquote><span style=\"color: rgb(68, 68, 68);\" class=\"ql-size-large\">Não há manutenções agendadas.</span></blockquote>', 6, 1, '2019-11-03 01:34:43', 4),
(39, 'Arduino com JS', 'Arduino com JS.png', 'Aprendendo a controlar o Arduino com NodeJS e a biblioteca Johnny-Five', '<h1 class=\"ql-align-center\"><strong>Arduino com JS</strong></h1><p><br></p><h2><strong>Programas necessários</strong></h2><p><br></p><ul><li><a href=\"https://code.visualstudio.com/\" target=\"_blank\">VSCode</a> (ou qualquer outra IDE/Editor de Texto)</li><li><a href=\"https://docs.npmjs.com/cli/install\" target=\"_blank\">NPM</a></li><li><a href=\"https://nodejs.org/en/\" target=\"_blank\">Node</a></li></ul><p><br></p><h2><strong>Componentes necessários</strong></h2><p><br></p><ul><li><span style=\"color: rgb(68, 68, 68);\"> O Arduino UNO (e o cabo de conexão USB)</span></li><li><span style=\"color: rgb(68, 68, 68);\"> Um LED</span></li><li><span style=\"color: rgb(68, 68, 68);\"> Um resistor de 220 OHM</span></li></ul><p><br></p><h2><strong>Preparando o Arduino</strong></h2><p><br></p><ol><li><span style=\"color: rgb(68, 68, 68);\">Baixe o </span><a href=\"https://www.arduino.cc/en/Main/Software\" target=\"_blank\" style=\"color: rgb(0, 102, 204);\">Arduino IDE</a><span style=\"color: rgb(68, 68, 68);\">.</span><a href=\"https://www.arduino.cc/en/Main/Software\" target=\"_blank\" style=\"color: rgb(68, 68, 68);\">﻿</a></li><li><span style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);\">Plugue o Arduino na USB do computador.</span></li><li><span style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);\">Abra a IDE, depois abra o arquivo no caminho \'</span><span style=\"color: rgb(68, 68, 68);\">File > Examples > Firmata > StandardFirmata\'</span></li><li><span style=\"color: rgb(68, 68, 68);\">C</span><span style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);\">lique em upload.</span></li></ol><p><br></p><h2><strong>Preparando o Projeto</strong></h2><p><br></p><ol><li><span style=\"color: rgb(68, 68, 68);\">Digite</span> <strong style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 204);\">npm init -y</strong><strong> </strong><span style=\"color: rgb(68, 68, 68);\">para iniciar um novo projeto em Node.</span></li><li><span style=\"color: rgb(68, 68, 68);\">Digite</span> <strong style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 204);\">npm install -s johnny-five</strong> <span style=\"color: rgb(68, 68, 68);\">para instalar o johnny-five</span>.</li><li><span style=\"color: rgb(68, 68, 68);\">Crie um arquivo chamado index.js e cole o código abaixo:</span></li></ol><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">const five = <span class=\"hljs-built_in\">require</span>(<span class=\"hljs-string\">\'johnny-five\'</span>)\r\n\r\nconst board = <span class=\"hljs-keyword\">new</span> five.Board();\r\n\r\n﻿let isReady = <span class=\"hljs-literal\">false</span>;\r\nlet isOn = <span class=\"hljs-literal\">false</span>;\r\nlet led;\r\n\r\nboard.<span class=\"hljs-literal\">on</span>(<span class=\"hljs-string\">\'ready\'</span>, <span class=\"hljs-function\"><span class=\"hljs-params\">()</span> =></span> {\r\n    led = <span class=\"hljs-keyword\">new</span> five.Led(<span class=\"hljs-number\">13</span>);\r\n\r\n    led.<span class=\"hljs-literal\">off</span>();\r\n\r\n    isReady = <span class=\"hljs-literal\">true</span>;\r\n});\r\n  \r\nhttp.createServer(<span class=\"hljs-function\"><span class=\"hljs-params\">(req, res)</span> =></span> {\r\n    toggleLed()\r\n\r\n    <span class=\"hljs-keyword\">if</span> (req.url == <span class=\"hljs-string\">\'/\'</span>) res.end(isOn + <span class=\"hljs-string\">\'\'</span>);\r\n    <span class=\"hljs-keyword\">else</span> res.end();\r\n}).listen(<span class=\"hljs-number\">3000</span>);\r\n  \r\n<span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\'listening at 3000\'</span>);\r\n\r\nfunction toggleLed () {\r\n    <span class=\"hljs-keyword\">if</span> (!isReady) { <span class=\"hljs-keyword\">return</span>; }\r\n  \r\n    <span class=\"hljs-keyword\">if</span> (isOn) {\r\n        led.<span class=\"hljs-literal\">off</span>();\r\n\r\n        isOn = <span class=\"hljs-literal\">false</span>;\r\n    } <span class=\"hljs-keyword\">else</span> {\r\n        led.<span class=\"hljs-literal\">on</span>();\r\n\r\n        isOn = <span class=\"hljs-literal\">true</span>;\r\n    }\r\n}\r\n</pre><p><br></p><h2><strong>Iniciando servidor</strong></h2><p><br></p><pre class=\"ql-syntax\" spellcheck=\"false\">node index.js\r\n</pre><p><br></p><p><span style=\"color: rgb(68, 68, 68);\">É isso! Agora basta modificar o código e deixá-lo à sua maneira.</span></p><p><br></p><blockquote><a href=\"https://github.com/lucasnaja/arduino-js\" target=\"_blank\" style=\"color: rgb(0, 102, 204);\">Clique aqui</a> <span style=\"color: rgb(68, 68, 68);\">para ir no meu GitHub e ver o projeto funcionando com socket.io e express.js com um código mais completo e detalhado. :)</span></blockquote>', 77, 1, '2019-11-03 17:41:57', 4),
(44, 'Hacktoberfest', 'Hacktoberfest.png', 'Hacktoberfest - Um evento do GitHub patrocinado pela DigitalOcean e Dev Community', '<h1 style=\"text-align: center;\"><strong>Hacktoberfest</strong></h1><p><br></p><blockquote><strong style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);\">Hacktoberfest</strong><span style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);\"> é uma celebração mundial da comunidade Open Source que ocorre durante o mês de outubro para incentivar a contribuição em projetos de código aberto.</span></blockquote><p><br></p><h2><strong>Por que?</strong></h2><p><br></p><p style=\"text-align: justify;\"><span style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);\">Para quem é Desenvolvedor, estudante aprendendo a programar, empresa de qualquer tamanho, ou um curioso do mundo da Tecnologia, você é incentivado a participar do evento, não importa seu nível de conhecimento (estamos todos aqui para aprender cada vez mais). Você pode aproveitar para sair da zona de conforto, e começar a participar do mundo open-source, ganhando cada vez mais conhecimento, e recebendo algo em troca por isso.</span></p><p style=\"text-align: justify;\"><br></p><h2 style=\"text-align: justify;\"><strong style=\"background-color: rgb(255, 255, 255);\">O que ganha?</strong></h2><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\"><span style=\"color: rgb(68, 68, 68); background-color: rgb(255, 255, 255);\">O prêmio para quem concluir o desafio é uma camiseta de edição limitada e stickers. Todo ano as camisetas mudam de design, no caso do evento que ocorreu em 2019, você pode ver a camiseta na thumbnail desse post. Mas não se esqueça, há um limite de camisetas, que são 50.000 unidades que serão entregues no mundo todo. Passando disso, você receberá somente os stickers.</span></p><p style=\"text-align: justify;\"><br></p><h2 style=\"text-align: justify;\"><strong style=\"background-color: rgb(255, 255, 255);\">Como funciona?</strong></h2><p style=\"text-align: justify;\"><br></p><p><span style=\"color: rgb(68, 68, 68);\">Você precisa abrir somente 4 Pull Requests em qualquer repositório (4 PRs em 1 repo ou 1 PR em 4 repos). Só isso. Para quem nunca mexeu no GitHub, recomendo fortemente pesquisar como funciona (eu fiquei pesquisando que nem louco no google como funcionava os PRs do GitHub, quando o meu professor da Etec de Guaratinguetá, Augusto da Silva Costa, me falou sobre o evento).</span></p>', 25, 1, '2019-11-04 00:12:09', 4);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `section_id` int(11) NOT NULL,
  `section_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `section_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `section_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `tool_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tool_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tool_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `tool_link` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `tool_visits` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `tool_status` tinyint(1) NOT NULL DEFAULT '1',
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`tool_id`, `tool_name`, `tool_path`, `tool_description`, `tool_link`, `tool_visits`, `tool_status`, `section_id`) VALUES
(7, 'Gerador de CPF', 'cpf_generator', 'Gerador de CPF Online para Programadores testarem seus Softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/CPFGenerator.js', 78, 1, 2),
(8, 'Gerador de Senha', 'password_generator', 'Gerador de Senha Online para gerar senhas personalizadas e fortes.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/passwordGenerator.js', 236, 1, 2),
(9, 'Gerador de Meta Tags', 'meta_tags_generator', 'Gerador de Meta Tags Online, feito para gerar várias das Meta Tags existentes.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/metaTagsGenerator.js', 62, 1, 2),
(11, 'Validador de CPF', 'cpf_validator', 'Validador de CPF Online para validar CPFs para programadores testarem seus softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/validators/CPFValidator.js', 42, 1, 4),
(12, 'Contador de Caracteres', 'characters_count', 'Contador de letras, caracteres sem espaço, palavras, espaços, vogais, consoantes, números e linhas.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/string_functions/charactersCount.js', 26, 1, 5),
(13, 'Meu IP', 'my_ip', 'Veja seu IP e muito mais informações aqui.', 'https://github.com/lucasnaja/4People/blob/master/pages/computation/network_internet/my_ip/src/index.js', 43, 1, 6),
(14, 'Meu Navegador', 'my_browser', 'Veja seu Navegador aqui.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/network_and_internet/myWebBrowser.js', 20, 1, 6),
(15, 'Buscar CEP', 'search_cep', 'Busque informações de seu CEP, como Rua, Cidade, Bairro e Estado aqui.', 'https://github.com/lucasnaja/4People/blob/master/pages/computation/network_internet/search_cep/src/index.js', 54, 1, 6),
(16, 'Binário, Octal e Hexadecimal', 'binary_converter', 'Tradutor Online de Código Binário. Basta digitar o código binário ou texto abaixo e clicar no botão para converter.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/encoders_decoders/binaryConverter.js', 25, 1, 7),
(17, 'Código de Evento das Teclas', 'keycode_event', 'Código de Eventos das Teclas para descobrir cada keyCode da tecla e criar eventos em sua linguagem de preferência.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/tables_and_patterns/jsEventKeyCodes.js', 38, 1, 8),
(18, 'Fatorar Número', 'factorize_number', 'Calculadora Online para Fatorar Números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/factorization.js', 82, 1, 12),
(19, 'Máximo Divisor Comum', 'gcd', 'Calculadora Online para encontrar o Máximo Divisor Comum entre vários números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/GCD.js', 11, 1, 12),
(20, 'Mínimo Múltiplo Comum', 'lcm', 'Calculadora Online para encontrar o Mínimo Múltiplo Comum entre vários números.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/LCM.js', 4, 1, 12),
(21, 'Índice de Massa Corporal', 'bmi', 'Calculadora de Índice de Massa Corporal Online para calcular o IMC e o seu peso ideal.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/BMI.js', 4, 1, 12),
(22, 'Porcentagem', 'percentage', 'Calculadora de Porcentagem Online com vários métodos para encontrar a porcentagem, como aumentos, descontos, proporções, etc.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/percentage.js', 25, 1, 12),
(23, 'Equação do 2° Grau', 'bhaskara', 'Cálculo da Equção do 2° Grau (Bhaskara) Online. Δ = B² - 4 * A * C, X = (-B +- √Δ) / 2 * A', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/bhaskara.js', 10, 1, 12),
(24, 'Números Primos', 'prime_numbers', 'Calculadora de Números Primos Online para verificar se número é primo ou não.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/primeNumbers.js', 14, 1, 12),
(25, 'Números Amigáveis', 'friendly_numbers', 'Números amigáveis são pares de números onde um deles é a soma dos divisores do outro.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/friendlyNumbers.js', 5, 1, 12),
(26, 'Fibonacci', 'fibonacci', 'Calculadora para calcular a Sequência de Fibonacci. Ex: 0, 1, 1, 2, 3, 5, 8, 13, entre outros...', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/fibonacci.js', 7, 1, 12),
(27, 'Conversor de Temperatura', 'temperature_converter', 'Conversor de Temperatura Online para calcular Graus Celsius, Fahrenheit e Kelvin.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/temperatureConversor.js', 7, 1, 12),
(28, 'Divisão e Resto', 'division_rest', 'Calculadora de Divisão Online que mostra o resultado da divisão comum e inteira entre dois números e o resto (módulo) entre eles.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/calculators/divisionAndRest.js', 8, 1, 12),
(29, 'Área do Círculo', 'circle_area', 'Calculador de Área do Círculo Online. R = Raio, D = Diâmetro (2 * R), PI = 3.141592653589793... (Math.PI.toFixed(48))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circleArea.js', 66, 1, 10),
(30, 'Área do Quadrado', 'square_area', 'Calculador de Área do Quadrado Online. Área do Quadrado = Lado * Lado ou L²', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/squareArea.js', 24, 1, 10),
(31, 'Área do Retângulo', 'rectangle_area', 'Calculador de Área do Retângulo Online. Área do Retângulo = Base * Altura', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/rectangleArea.js', 10, 1, 10),
(32, 'Área do Triângulo', 'triangle_area', 'Calculador de Área do Triângulo Online. Área do Triângulo = Base * Altura / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/triangleArea.js', 9, 1, 10),
(33, 'Área do Pentágono', 'pentagon_area', 'Calculador de Área do Pentágono Online. Área do Pentágono = (5 * Lado²) / (4 * tan(36°))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/pentagonArea.js', 16, 1, 10),
(34, 'Área do Hexágono', 'hexagon_area', 'Calculador de Área do Hexágono Online. Área do Hexágono = (6 * Lado²) / (4 * tan(30°))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/hexagonArea.js', 4, 1, 10),
(35, 'Área do Polígono Regular', 'regular_polygon_area', 'Calculador de Área do Polígono Regular Online. π = PI, Área do Polígono Regular = (Lado² * Qntd de Lados) / (4 * tan(π / 10))', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/regularPolygonArea.js', 7, 1, 10),
(36, 'Área do Losango', 'diamond_area', 'Calculador de Área do Losango Online. Área do Losango = (Diagonal1 * Diagonal2) / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/diamondArea.js', 5, 1, 10),
(37, 'Área do Trapézio', 'trapeze_area', 'Calculador de Área do Trapézio Online. B = Base maior, b = Base menor, A = Altura, Área do Trapézio = (B + b) * A / 2', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/trapezoidArea.js', 4, 1, 10),
(38, 'Área do Paralelogramo', 'parallelogram_area', 'Calculador de Área do Paralelogramo Online. Área do Paralelogramo = Base * Altura', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/parallelogramArea.js', 4, 1, 10),
(39, 'Área da Elipse', 'ellipse_area', 'Calculador de Área da Elipse Online. π = PI, Área da Elipse = π * Eixo maior * Eixo menor', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/ellipseArea.js', 5, 1, 10),
(40, 'Área da Coroa Ciricular', 'circular_crown_area', 'Calculador de Área da Coroa Circular Online. π = PI, R = Raio maior, r = Raio menor, Área da Coroa Circular = π * (R² - r²)', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circularCrownArea.js', 6, 1, 10),
(41, 'Área do Setor Circular', 'circular_sector_area', 'Calculador de Área do Setor Circular Online. π = PI, Área do Setor Circular = π * (Raio² * Ângulo) / 360', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/areas_calculator/circularSectorArea.js', 5, 1, 10),
(42, 'Diferença entre Datas', 'difference_between_dates', 'Calcular Diferença entre Datas. Possui um leque de recursos disponíveis, como calcular idades, tempo, etc.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/dates_calculator/differenceBetweenDates.js', 167, 1, 11),
(50, 'Gerador de Nomes', 'name_generator', 'Gerador de Nomes online e gratuito para gerar diversos tipos de nomes.', '', 11, 1, 2),
(52, 'Tabela ASCII', 'ascii_table', 'Lista de códigos padrões da tabela ASC II.', 'https://github.com/lucasnaja/4People/tree/master/pages/computation/tables_patterns/ascii_table', 12, 1, 8),
(53, 'Inverter Texto', 'reverse_text', 'Inversor de Texto online do 4People', 'https://github.com/lucasnaja/4People/tree/master/assets/algorithms/string_functions/reverseText.js', 7, 1, 5),
(54, 'Gerador de RG', 'rg_generator', 'Gerador de RG Online para Programadores testarem seus Softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/RGGenerator.js', 17, 1, 2),
(55, 'Gerador de CNPJ', 'cnpj_generator', 'Gerador de CNPJ Online para Programadores testarem seus Softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/generators/CNPJGenerator.js', 10, 1, 2),
(56, 'Validador de RG', 'rg_validator', 'Validador de RG Online para validar RGs para programadores testarem seus softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/validators/RGValidator.js', 12, 1, 4),
(57, 'Validador de CNPJ', 'cnpj_validator', 'Validador de CNPJ Online para validar CNPJs para programadores testarem seus softwares em desenvolvimento.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/validators/CNPJValidator.js', 7, 1, 4),
(58, 'Somar em Data', 'add_in_date', 'Some dias, semanas, meses ou anos em uma Data.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/dates_calculator/addInDate.js', 7, 1, 11),
(59, 'Subtrair em Data', 'subtract_in_date', 'Subtraia dias, semanas, meses ou anos de uma Data.', 'https://github.com/lucasnaja/4People/blob/master/assets/algorithms/dates_calculator/subtractInDate.js', 4, 1, 11);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=351;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `maintenances`
--
ALTER TABLE `maintenances`
  MODIFY `maintenance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

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
