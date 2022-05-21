-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2022 at 10:36 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `website_pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `name`, `description`) VALUES
(1, '25% Dextrose', 'Dextrose 25% Infusion is used for short term fluid replacement. It works by replenishing fluid loss. Thus, it treats hypovolemia that can result due to dehydration, injury, or burns.'),
(2, 'Mesalazine', 'Mesalazine, also known as mesalamine or 5-aminosalicylic acid (5-ASA), is a medication used to treat inflammatory bowel disease, including ulcerative colitis and Crohns disease.It is generally used for mildly to moderately severe disease.It is taken by mouth or rectally.The formulations which are taken by mouth appear to be similarly effective.'),
(3, 'Allopurinol', 'Allopurinol is used to treat gout and certain types of kidney stones. It is also used to prevent increased uric acid levels in patients receiving cancer chemotherapy. These patients can have increased uric acid levels due to release of uric acid from the dying cancer cells. Allopurinol works by reducing the amount of uric acid made by the body. Increased uric acid levels can cause gout and kidney problems.'),
(4, 'Amoxicillin+Clavulinic acid', 'The combination of amoxicillin and clavulanic acid is used to treat certain infections caused by bacteria, including infections of the ears, lungs, sinus, skin, and urinary tract. Amoxicillin is in a class of medications called penicillin-like antibiotics. It works by stopping the growth of bacteria. Clavulanic acid is in a class of medications called beta-lactamase inhibitors. It works by preventing bacteria from destroying amoxicillin.'),
(5, 'Cefixime', 'Cefixime is a third-generation cephalosporin antibiotic that is highly effective against many types of bacteria. It fights diseases by stopping the growth of bacteria that cause them.');

-- --------------------------------------------------------

--
-- Table structure for table `med_phar`
--

CREATE TABLE `med_phar` (
  `ID_phar` int(11) NOT NULL,
  `ID_med` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pharmacy`
--

CREATE TABLE `pharmacy` (
  `Id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pharmacy`
--

INSERT INTO `pharmacy` (`Id`, `name`, `location`) VALUES
(1, 'Brunet', 'Canada'),
(2, 'China Nepstar', 'China'),
(3, 'Celesio', 'Germany'),
(4, 'Mannings', 'Hong Kong'),
(5, 'Guardian Pharmacy', 'Malaysia');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `medicine_name_uindex` (`name`);

--
-- Indexes for table `med_phar`
--
ALTER TABLE `med_phar`
  ADD PRIMARY KEY (`ID_med`),
  ADD KEY `med_phar_pharmacy_Id_fk` (`ID_phar`);

--
-- Indexes for table `pharmacy`
--
ALTER TABLE `pharmacy`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `pharmacy_name_uindex` (`name`,`location`) USING HASH;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pharmacy`
--
ALTER TABLE `pharmacy`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `med_phar`
--
ALTER TABLE `med_phar`
  ADD CONSTRAINT `med_phar_medicine_id_fk` FOREIGN KEY (`ID_med`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `med_phar_pharmacy_Id_fk` FOREIGN KEY (`ID_phar`) REFERENCES `pharmacy` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
