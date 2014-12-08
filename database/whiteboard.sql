-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 08 dec 2014 om 10:03
-- Serverversie: 5.5.29
-- PHP-versie: 5.4.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `whiteboard`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `boardusers`
--

CREATE TABLE `boardusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `board_id` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `images`
--

CREATE TABLE `images` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `image` varchar(45) NOT NULL,
  `whiteboard_id` tinyint(11) NOT NULL,
  `xPos` varchar(45) NOT NULL,
  `yPos` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Gegevens worden uitgevoerd voor tabel `images`
--

INSERT INTO `images` (`id`, `title`, `image`, `whiteboard_id`, `xPos`, `yPos`) VALUES
(7, 'image', 'image', 15, '100', '300'),
(8, 'image', 'image', 15, '200', '400'),
(10, 'image', 'image', 15, '145', '145'),
(11, 'image', 'image', 15, '980', '980'),
(12, 'image', 'image', 15, '260', '260'),
(14, 'image', 'image', 15, '512', '512'),
(15, 'image', 'image', 15, '582', '582'),
(16, 'image', 'image', 16, '560', '332'),
(17, 'image', 'image', 16, '215', '264'),
(18, 'image', 'image', 14, '494', '108'),
(19, 'image', 'image', 14, '330', '162'),
(20, 'image', 'image', 11, '883', '375'),
(21, 'image', 'image', 11, '316', '168'),
(22, 'image', 'image', 11, '215', '357'),
(23, 'image', 'image', 14, '676', '308'),
(24, 'image', 'image', 14, '376', '107'),
(25, 'image', 'image', 12, '284', '176');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `invites`
--

CREATE TABLE `invites` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `user_id` tinyint(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `whiteboard_id` tinyint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `postits`
--

CREATE TABLE `postits` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `text` varchar(255) NOT NULL,
  `whiteboard_id` tinyint(11) NOT NULL,
  `xPos` varchar(45) NOT NULL,
  `yPos` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Gegevens worden uitgevoerd voor tabel `postits`
--

INSERT INTO `postits` (`id`, `title`, `text`, `whiteboard_id`, `xPos`, `yPos`) VALUES
(3, 'note', 'note', 15, '529', '296'),
(4, 'note', 'note', 15, '163', '172'),
(5, 'note', 'note', 15, '285', '100'),
(6, 'note', 'note', 15, '529', '189'),
(7, 'note', 'note', 15, '274', '382'),
(8, 'note', 'note', 15, '495', '251'),
(9, 'note', 'note', 15, '455', '366'),
(10, 'note', 'note', 15, '788', '251'),
(11, 'note', 'note', 15, '958', '100'),
(12, 'note', 'note', 16, '335', '278'),
(13, 'note', 'note', 16, '782', '181'),
(14, 'note', 'note', 14, '519', '176'),
(15, 'note', 'note', 14, '144', '291'),
(16, 'note', 'note', 11, '414', '378'),
(17, 'note', 'note', 14, '509', '315'),
(18, 'note', 'note', 14, '834', '190'),
(19, 'note', 'note', 14, '298', '350'),
(20, 'note', 'note', 14, '376', '166'),
(21, 'note', 'note', 14, '577', '304'),
(22, 'note', 'note', 14, '337', '371'),
(23, 'note', 'note', 14, '668', '357'),
(24, 'note', 'note', 14, '921', '395'),
(25, 'note', 'note', 14, '857', '139'),
(26, 'note', 'note', 14, '580', '347'),
(27, 'note', 'note', 14, '994', '174'),
(28, 'note', 'note', 14, '337', '148'),
(29, 'note', 'note', 14, '379', '170'),
(30, 'note', 'note', 12, '656', '115'),
(31, 'note', 'note', 12, '582', '155');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `role_id` tinyint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Gegevens worden uitgevoerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `profile_image`, `role_id`) VALUES
(9, 'test', '$2y$12$KHkZBgA65QgFsYOurUK01uly7f2a1gOyZZo1nBqusSxMCHTL9caWS', 'test@test.com', 'test', 0),
(10, 'gilles', '$2y$12$hgtSd3ioE/AXVR8/DufbiO2y5PBcVBfrEgSmiDaaedEJvmuW3NmdS', 'gilles@gmail.com', 'test', 0),
(11, 'stuijk', '$2y$12$LqMhLrZgjn2/In/gUSlEr.MTaLPv0L8F0SuzVIjbL1tOXsIJ/Ddra', 'stuijk@test.com', 'test', 0),
(12, 'teststuijk', '$2y$12$tGlDQ...loU5AbMT/3A/Qe9wCGabNQiIzEjwxKFXC7SuZlZWEnIVW', 'stuijk@stuijk.com', 'test', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `videos`
--

CREATE TABLE `videos` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `video_id` varchar(255) NOT NULL,
  `whiteboard_id` tinyint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `whiteboard`
--

CREATE TABLE `whiteboard` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `creator_id` tinyint(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Gegevens worden uitgevoerd voor tabel `whiteboard`
--

INSERT INTO `whiteboard` (`id`, `title`, `creator_id`, `date_added`) VALUES
(11, 'Testboard', 10, '2014-11-30 19:27:44'),
(12, 'testboard', 11, '2014-12-02 07:47:30'),
(13, 'Whiteboard TEST', 11, '2014-12-02 07:47:36'),
(14, 'Renaat''s whiteboard', 11, '2014-12-02 08:42:36'),
(15, 'My first whiteboard', 9, '2014-12-05 14:39:31'),
(16, 'Whiteboard van stuijk', 12, '2014-12-05 21:41:11');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
