-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 23, 2021 alle 09:38
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schoolticket`
--
CREATE DATABASE IF NOT EXISTS `schoolticket` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `schoolticket`;

-- --------------------------------------------------------

--
-- Struttura della tabella `categoria`
--

CREATE TABLE `categoria` (
  `IdCategoria` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Descrizione` varchar(1000) DEFAULT NULL
) ;

--
-- Dump dei dati per la tabella `categoria`
--

INSERT INTO `categoria` (`IdCategoria`, `Nome`, `Descrizione`) VALUES
(1, 'Dirigenza-DSGA-Vicepresidenza', NULL),
(2, 'Docenti', NULL),
(3, 'Studenti', NULL),
(4, 'Tecnici', NULL),
(5, 'Amministrativi', NULL),
(6, 'Collaboratori scolastici', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `competenza`
--

CREATE TABLE `competenza` (
  `IdCompetenza` int(11) NOT NULL,
  `IdCategoria` int(11) NOT NULL,
  `IdMacroarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `incarico`
--

CREATE TABLE `incarico` (
  `IdIncarico` int(11) NOT NULL,
  `StatodiAvanzamento` varchar(100) NOT NULL,
  `IdUtente` int(11) NOT NULL,
  `IdTicket` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Struttura della tabella `macroarea`
--

CREATE TABLE `macroarea` (
  `IdMacroarea` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Descrizione` varchar(1000) DEFAULT NULL
) ;

--
-- Dump dei dati per la tabella `macroarea`
--

INSERT INTO `macroarea` (`IdMacroarea`, `Nome`, `Descrizione`) VALUES
(1, 'Attrezzature aule audio, video, PC', NULL),
(2, 'Attrezzature informatiche della scuola', NULL),
(3, 'Prenotazioni laboratori per esercitazioni', NULL),
(4, 'Manutenzione infrastruttura', NULL),
(5, 'Acquisti (generali-laboratori)', NULL),
(6, 'Stampa (problemi hardware e software)', NULL),
(7, 'Attivazione servizi', NULL),
(8, 'Macchine laboratori (bloccata-problemi hardware-processi)', NULL),
(9, 'Installazione/configurazione/aggiornamenti', NULL),
(10, 'Connessione e rete (Wireless-LAN)', NULL),
(11, 'Account', NULL),
(12, 'Altro', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `note`
--

CREATE TABLE `note` (
  `IdNote` int(11) NOT NULL,
  `Descrizione` varchar(1000) DEFAULT NULL,
  `IdTicket` int(11) NOT NULL,
  `IdUtente` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Struttura della tabella `ticket`
--

CREATE TABLE `ticket` (
  `IdTicket` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Descrizione` varchar(1000) DEFAULT NULL,
  `UrlFoto` varchar(300) DEFAULT NULL,
  `StatoDiAvanzamento` varchar(100) NOT NULL,
  `Priorita` int(11) NOT NULL DEFAULT 1,
  `Aula` varchar(100) NOT NULL,
  `Data` date NOT NULL,
  `Ora` time NOT NULL,
  `IdMacroarea` int(11) NOT NULL,
  `IdUtente` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `IdUtente` int(11) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Psw` varchar(128) NOT NULL,
  `IdCategoria` int(11) NOT NULL
) ;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`IdCategoria`);

--
-- Indici per le tabelle `competenza`
--
ALTER TABLE `competenza`
  ADD PRIMARY KEY (`IdCompetenza`),
  ADD KEY `IdCategoria` (`IdCategoria`,`IdMacroarea`),
  ADD KEY `IdMacroarea` (`IdMacroarea`);

--
-- Indici per le tabelle `incarico`
--
ALTER TABLE `incarico`
  ADD PRIMARY KEY (`IdIncarico`),
  ADD KEY `IdUtente` (`IdUtente`,`IdTicket`),
  ADD KEY `IdTicket` (`IdTicket`);

--
-- Indici per le tabelle `macroarea`
--
ALTER TABLE `macroarea`
  ADD PRIMARY KEY (`IdMacroarea`);

--
-- Indici per le tabelle `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`IdNote`),
  ADD KEY `IdTicket` (`IdTicket`,`IdUtente`),
  ADD KEY `IdUtente` (`IdUtente`);

--
-- Indici per le tabelle `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`IdTicket`),
  ADD KEY `IdMacroarea` (`IdMacroarea`,`IdUtente`),
  ADD KEY `IdUtente` (`IdUtente`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`IdUtente`),
  ADD KEY `IdCategoria` (`IdCategoria`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `categoria`
--
ALTER TABLE `categoria`
  MODIFY `IdCategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `competenza`
--
ALTER TABLE `competenza`
  MODIFY `IdCompetenza` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `incarico`
--
ALTER TABLE `incarico`
  MODIFY `IdIncarico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `macroarea`
--
ALTER TABLE `macroarea`
  MODIFY `IdMacroarea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `note`
--
ALTER TABLE `note`
  MODIFY `IdNote` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `ticket`
--
ALTER TABLE `ticket`
  MODIFY `IdTicket` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `IdUtente` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `competenza`
--
ALTER TABLE `competenza`
  ADD CONSTRAINT `competenza_ibfk_1` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `competenza_ibfk_2` FOREIGN KEY (`IdMacroarea`) REFERENCES `macroarea` (`IdMacroarea`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `incarico`
--
ALTER TABLE `incarico`
  ADD CONSTRAINT `incarico_ibfk_1` FOREIGN KEY (`IdUtente`) REFERENCES `utente` (`IdUtente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `incarico_ibfk_2` FOREIGN KEY (`IdTicket`) REFERENCES `ticket` (`IdTicket`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`IdTicket`) REFERENCES `ticket` (`IdTicket`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `note_ibfk_2` FOREIGN KEY (`IdUtente`) REFERENCES `utente` (`IdUtente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`IdMacroarea`) REFERENCES `macroarea` (`IdMacroarea`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`IdUtente`) REFERENCES `utente` (`IdUtente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `utente`
--
ALTER TABLE `utente`
  ADD CONSTRAINT `utente_ibfk_1` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
