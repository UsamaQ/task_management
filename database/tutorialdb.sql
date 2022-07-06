-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220626.78b2c1f4eb
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2022 at 02:19 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tutorialdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `backlogs`
--

CREATE TABLE `backlogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `labelID` int(11) DEFAULT NULL,
  `assignedBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `backlogs`
--

INSERT INTO `backlogs` (`id`, `title`, `description`, `labelID`, `assignedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Backlog 1', 'This is a Test Backlog.\r\nLorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.', 1, 0, '2022-06-14 12:28:40', '2022-06-14 11:40:37'),
(2, 'Backlog 2', 'Description of backlog 2', 32, 0, '2022-06-15 06:30:09', '2022-06-15 06:30:09'),
(3, 'Backlog 3', 'Description of backlog 3', 100, 0, '2022-06-15 06:30:09', '2022-06-15 06:30:09'),
(4, 'Backlog 4', 'Description of backlog 4ffsdgfxcvzxvc', 21, 0, '2022-06-17 16:17:37', '2022-06-17 16:17:37'),
(31, 'Backlog 21', 'Description of backlog 31', 21, 0, '2022-06-15 06:30:09', '2022-06-15 06:30:09'),
(34, 'usamaTariq', '', 0, NULL, '2022-06-15 10:38:46', '2022-06-15 10:38:46'),
(36, 'Backlog A', 'Description of Backlog Abc\nhello there', 0, NULL, '2022-06-15 12:43:56', '2022-06-15 12:43:56'),
(37, 'usama tariq', 'xcddbfshdbfhsdbfhbsdnfbsnb df', 0, NULL, '2022-06-16 11:18:33', '2022-06-16 11:18:33');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `commentBody` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `commentBody`, `createdAt`, `updatedAt`, `PostId`) VALUES
(1, 'Civic is awesome', '2022-05-26 19:03:00', '2022-05-26 19:03:00', 1),
(2, 'logged in as usama', '2022-05-26 19:28:24', '2022-05-26 19:28:24', 1),
(3, '12345', '2022-05-27 05:24:52', '2022-05-27 05:24:52', 1),
(4, 'abbc 123', '2022-05-27 09:59:00', '2022-05-27 09:59:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `postText` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `postText`, `username`, `createdAt`, `updatedAt`) VALUES
(1, 'Cars', 'civic, reborn, altas, rivo, gli', 'usama', '2022-05-26 10:03:14', '2022-05-26 10:03:14'),
(2, 'abc', 'abcdefghijklmnopqrstuvwxyz', 'usama', '2022-05-26 11:44:00', '2022-05-26 11:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `sprints`
--

CREATE TABLE `sprints` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startDate` date DEFAULT NULL,
  `status` enum('Active','Inactive','Completed','Cancelled') NOT NULL,
  `dueDate` date DEFAULT NULL,
  `priority` enum('Low','Medium','High') NOT NULL,
  `assignedBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sprints`
--

INSERT INTO `sprints` (`id`, `title`, `description`, `startDate`, `status`, `dueDate`, `priority`, `assignedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Sprint 1', 'Description of Sprint 1.aksjbdllkansdlna;lsd', '0000-00-00', 'Active', '2022-06-28', 'Medium', NULL, '2022-06-16 08:51:09', '2022-06-17 16:18:59'),
(3, 'Sprint  A', 'Description of Sprint A', '2022-06-18', 'Inactive', '2022-06-24', 'Low', NULL, '2022-06-17 07:16:18', '2022-06-17 07:16:18'),
(4, 'AAAAAAAA', 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', '2022-06-23', 'Inactive', '2022-06-30', 'High', NULL, '2022-06-23 04:47:26', '2022-06-23 04:47:26');

-- --------------------------------------------------------

--
-- Table structure for table `subtasks`
--

CREATE TABLE `subtasks` (
  `id` int(11) NOT NULL,
  `data` varchar(255) NOT NULL,
  `isChecked` enum('0','1') NOT NULL DEFAULT '0',
  `taskID` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subtasks`
--

INSERT INTO `subtasks` (`id`, `data`, `isChecked`, `taskID`, `createdAt`, `updatedAt`) VALUES
(3, 'usama', '1', 3, '2022-06-21 13:01:06', '2022-06-21 13:01:06'),
(4, 'asdasd', '0', 3, '2022-06-21 13:02:16', '2022-06-21 13:02:16'),
(5, 'xyz', '0', 3, '2022-06-21 13:04:50', '2022-06-21 13:04:50');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('To Do','In Progress','Completed','Pending','Cancelled') NOT NULL,
  `priority` enum('Low','Medium','High') NOT NULL,
  `size` enum('Extra Small','Small','Medium','Large','Extra Large') NOT NULL,
  `dueDate` date DEFAULT NULL,
  `backlogID` int(11) NOT NULL,
  `sprintID` int(11) NOT NULL,
  `labelID` int(11) NOT NULL,
  `commentsID` int(11) DEFAULT NULL,
  `percentCompleted` varchar(255) DEFAULT NULL,
  `assignedTo` int(11) DEFAULT NULL,
  `assignedBy` int(11) DEFAULT NULL,
  `attachment` longblob DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `priority`, `size`, `dueDate`, `backlogID`, `sprintID`, `labelID`, `commentsID`, `percentCompleted`, `assignedTo`, `assignedBy`, `attachment`, `createdAt`, `updatedAt`) VALUES
(1, 'TASK 1  ABC', 'Description of task 1', 'To Do', 'Low', 'Large', '2022-06-08', 37, 3, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-16 15:35:13', '2022-06-17 12:14:35'),
(3, 'usama tariq', ' description of usama', 'Completed', 'Low', 'Medium', '2022-06-24', 37, 4, 0, NULL, NULL, NULL, NULL, 0x00, '2022-06-17 12:24:22', '2022-06-18 09:07:16'),
(4, 'abc', 'zxczsfsdfsd', 'Pending', 'Medium', 'Extra Small', '2022-06-26', 36, 1, 0, NULL, NULL, NULL, NULL, NULL, '2022-06-17 16:16:36', '2022-06-17 16:16:36'),
(5, 'TAsks dsfadskjbf', 'sndbvfhgadsggfsadfhsnac fsdjjhfkjsadbfnsdbncvbdsveif jkhdfjd', 'Pending', 'Low', 'Extra Large', '2022-07-14', 31, 3, 0, NULL, NULL, NULL, NULL, '', '2022-06-22 10:28:51', '2022-06-22 10:28:51'),
(6, 'asddasfsdsda', 'sdfsdvccxv', 'Pending', 'Medium', 'Extra Small', '2020-06-03', 31, 1, 0, NULL, NULL, NULL, NULL, '', '2022-06-22 10:29:33', '2022-06-22 10:29:33'),
(7, 'xcvxzcvxcvxc v  qweqw', 'usadmsnadfnmfskdmfdbvhbhfbv dnfdsjjkfvsd sdf;lkasdl sdfj;alksdf', 'In Progress', 'Low', 'Small', '2022-06-26', 34, 1, 0, NULL, NULL, NULL, NULL, '', '2022-06-22 10:30:19', '2022-06-22 10:30:19'),
(8, 'task for the month of JAN', 'asjdbbfkjsdhfhsdfhsdjdbfnsdbfsdbjbsdjjcnbjksdncc', 'To Do', 'Low', 'Extra Large', '2022-01-13', 2, 3, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-27 07:51:27', '2022-06-27 07:51:27'),
(9, 'task for the month of March', 'asjdbbfkjsdhfhsdfhsdjdbfnsdbfsdbjbsdjjcnbjksdncc', 'To Do', 'Low', 'Extra Large', '2022-03-13', 4, 1, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-27 07:59:31', '2022-06-27 07:59:31'),
(10, 'task for the month of April', 'asjdbbfkjsdhfhsdfhsdjdbfnsdbfsdbjbsdjjcnbjksdncc', 'To Do', 'Low', 'Extra Large', '2022-04-13', 31, 3, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-27 07:59:31', '2022-06-27 07:59:31'),
(11, 'task for the month of May', 'asjdbbfkjsdhfhsdfhsdjdbfnsdbfsdbjbsdjjcnbjksdncc', 'To Do', 'Low', 'Extra Large', '2022-05-15', 36, 3, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-27 07:59:31', '2022-06-27 07:59:31'),
(12, 'task for the month of Dec', 'asjdbbfkjsdhfhsdfhsdjdbfnsdbfsdbjbsdjjcnbjksdncc', 'To Do', 'Low', 'Extra Large', '2022-12-13', 37, 3, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-27 07:59:31', '2022-06-27 07:59:31'),
(13, 'task for the month of May', 'asjdbbfkjsdhfhsdfhsdjdbfnsdbfsdbjbsdjjcnbjksdncc', 'To Do', 'Low', 'Extra Large', '2022-05-13', 31, 3, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-27 07:59:31', '2022-06-27 07:59:31'),
(14, 'task for the month of July', 'asjdbbfkjsdhfhsdfhsdjdbfnsdbfsdbjbsdjjcnbjksdncc', 'To Do', 'Low', 'Extra Large', '2022-07-13', 4, 3, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-27 07:59:32', '2022-06-27 07:59:32'),
(15, 'task for the month of Feb', 'asjdbbfkjsdhfhsdfhsdjdbfnsdbfsdbjbsdjjcnbjksdncc', 'To Do', 'Low', 'Extra Large', '2022-02-13', 3, 3, 1, NULL, NULL, NULL, NULL, NULL, '2022-06-27 07:59:31', '2022-06-27 07:59:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'usama', '', '$2b$10$5r7z/oItdGkqFMo/v5TZFukc7oaHv2eU7A/37zDPOxjRphwx6GH/y', '2022-05-26 05:18:41', '2022-05-26 05:18:41'),
(4, 'usama1', '', '$2b$10$LmuGNAmArYRFT70nttYvReQ4.ABSfyeAQgVNaZJtNRdj.bNd76rpS', '2022-06-13 00:52:05', '2022-06-13 00:52:05'),
(5, 'guest', 'usamaq795@gmail.com', '$2b$10$YOejLrOAlV8To2swBArj1umuYqx2qtpkD2zey8Hm92tD/CQPvEXvO', '2022-06-13 10:32:58', '2022-06-13 10:32:58'),
(6, 'abc', 'usamaq@gmail.com', '$2b$10$Mr.BZlIu9KUqRerlzGbEf.osYFd5ZhKYPkWvVCsaroF6n3QxXixN2', '2022-06-13 11:18:23', '2022-06-13 11:18:24'),
(7, 'aksjdbnaknsd', 'aksbdjaksbd@gmail.com', '$2b$10$hxv2eQi2Hp1yCRo32CGGvezjgtdgKggGDLwpq9WVBWJuc/I63dUry', '2022-06-13 13:15:41', '2022-06-13 13:15:41'),
(8, 'ajysdbv', 'aksdaksd@gmail.com', '$2b$10$q35yMrdhyHrz2wJkAKrtvuzMcmVDjjLNAsU04IROGfOHy.MSua4eG', '2022-06-13 13:36:22', '2022-06-13 13:36:22'),
(9, 'A,snsdlkajns', 'aksdaksd@gmail.comasda', '$2b$10$eD5geY.dqGjWPnEjbvOO..Wem.NZDJ2OYrFnLqUOKRspNh4SkG8Hi', '2022-06-13 13:39:15', '2022-06-13 13:39:15'),
(10, 'gues', 'asdasd@asd.com', '$2b$10$YE/Joi9FmA6Zz9gUbC5b.eA0Ks9/2Q1QP2KaFW7wYGZfNvoLQkPCy', '2022-06-13 15:27:46', '2022-06-13 15:27:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `backlogs`
--
ALTER TABLE `backlogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PostId` (`PostId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sprints`
--
ALTER TABLE `sprints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subtasks`
--
ALTER TABLE `subtasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `backlogs`
--
ALTER TABLE `backlogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sprints`
--
ALTER TABLE `sprints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subtasks`
--
ALTER TABLE `subtasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



