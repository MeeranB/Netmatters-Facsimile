-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 14, 2022 at 02:47 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `netmatters_contact`
--

-- --------------------------------------------------------

--
-- Table structure for table `news_posts`
--

CREATE TABLE `news_posts` (
  `ID` int(11) NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `tag` text NOT NULL,
  `content` text NOT NULL,
  `author` text NOT NULL,
  `date` date NOT NULL,
  `author_image` text NOT NULL,
  `style` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news_posts`
--

INSERT INTO `news_posts` (`ID`, `title`, `image`, `tag`, `content`, `author`, `date`, `author_image`, `style`) VALUES
(1, 'Trainee IT Technician', 'https://www.netmatters.co.uk/assets/images/thumbnails/thumb/trainee-it-technician-NyQO.jpg', 'Careers', 'Salary Range\r\nNational Minimum Wage\r\nHours\r\n40 hours per week, Monday – Friday\r\nLocation\r\nWymondham, Gorleston or Cambridge. What We Are Looking For\r\n\r\nWe are looking for an IT Scion Support Technician to join the team and grow alongside us as we embark on many new projects and challenges.  ', 'Rob George', '2022-02-10', 'https://www.netmatters.co.uk/assets/images/thumbnails/article_contact_thumb/rob-george-zFWY.jpg', 'it'),
(2, 'Streamlined Customer Engagement with Salesforce', 'https://www.netmatters.co.uk/assets/images/thumbnails/thumb/streamlined-customer-engagement-FCsK.jpg', 'News', 'Taking your store online is a big jump for anyone, whether you’re launching your new retail idea or turning brick into click, perfecting the art of e-commerce has become an even bigger concern in recent years. For many, basic understanding and analytic awareness of their online customers can be the utmost make or break of their e-commerce success online. This is why you need a customer relationship management (CRM) platform tailored to you.', 'Jake Tuley', '2022-02-09', 'https://www.netmatters.co.uk/assets/images/thumbnails/article_contact_thumb/jake-tuley-n6Gu.jpg', 'software'),
(3, 'January Notables 2022', 'https://www.netmatters.co.uk/assets/images/thumbnails/thumb/january-notables-2022-p0MA.jpg', 'News', 'At the very start of the year, it\'s always a pleasure to see our team members make an impact from the get-go. January saw some fantastic work from the Netmatters team, and we are always proud to share our thoughts on the most notable team members every month. Every department recognises those who have gone above and beyond to deliver excellence within their work and helping Netmatters deliver the best services for our clients. ', 'Netmatters Ltd', '2022-02-07', 'https://www.netmatters.co.uk/assets/images/thumbnails/article_contact_thumb/netmatters-ltd-VXAv.png', 'web');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news_posts`
--
ALTER TABLE `news_posts`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news_posts`
--
ALTER TABLE `news_posts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
