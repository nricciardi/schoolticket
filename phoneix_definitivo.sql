-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 22, 2021 alle 18:51
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
-- Database: `phoneix`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `accessibilità`
--

CREATE TABLE `accessibilità` (
  `IdAccessibilità` int(11) NOT NULL,
  `Id` int(11) NOT NULL,
  `IdMacroarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `amministrativi`
--

CREATE TABLE `amministrativi` (
  `IdAmministrativi` int(11) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Psw` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `dirigenza`
--

CREATE TABLE `dirigenza` (
  `IdDirigenza` int(11) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Psw` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `docente`
--

CREATE TABLE `docente` (
  `IdDocente` int(50) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Psw` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `incarico`
--

CREATE TABLE `incarico` (
  `IdIncarico` int(11) NOT NULL,
  `StatodiAvanzamento` varchar(100) NOT NULL,
  `Id` int(11) NOT NULL,
  `IdTicket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `macroarea`
--

CREATE TABLE `macroarea` (
  `IdMacroarea` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Descrizione` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `note`
--

CREATE TABLE `note` (
  `IdNota` int(11) NOT NULL,
  `Descrizione` varchar(1000) NOT NULL,
  `IdProblema` int(11) NOT NULL,
  `Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `personaleata`
--

CREATE TABLE `personaleata` (
  `IdATA` int(11) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Psw` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `studente`
--

CREATE TABLE `studente` (
  `IdStudente` int(11) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Psw` varchar(128) NOT NULL,
  `Classe` int(11) NOT NULL,
  `Sezione` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `tecnico`
--

CREATE TABLE `tecnico` (
  `IdTecnico` int(11) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Psw` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `ticket`
--

CREATE TABLE `ticket` (
  `IdTicket` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Descrizione` varchar(1000) DEFAULT NULL,
  `Urlfoto` varchar(300) DEFAULT NULL,
  `StatodiAvanzamento` varchar(50) DEFAULT NULL,
  `Priorita` varchar(50) DEFAULT NULL,
  `Aula` int(11) NOT NULL,
  `Data` date DEFAULT NULL,
  `Ora` varchar(50) DEFAULT NULL,
  `Id` int(11) DEFAULT NULL,
  `IdMacroarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accessibilità`
--
ALTER TABLE `accessibilità`
  ADD PRIMARY KEY (`IdAccessibilità`),
  ADD KEY `Accessibilità_fk_Macroarea` (`IdMacroarea`);

--
-- Indici per le tabelle `amministrativi`
--
ALTER TABLE `amministrativi`
  ADD PRIMARY KEY (`IdAmministrativi`);

--
-- Indici per le tabelle `dirigenza`
--
ALTER TABLE `dirigenza`
  ADD PRIMARY KEY (`IdDirigenza`);

--
-- Indici per le tabelle `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`IdDocente`);

--
-- Indici per le tabelle `incarico`
--
ALTER TABLE `incarico`
  ADD PRIMARY KEY (`IdIncarico`),
  ADD KEY `incarico_ibfk_1` (`IdTicket`);

--
-- Indici per le tabelle `macroarea`
--
ALTER TABLE `macroarea`
  ADD PRIMARY KEY (`IdMacroarea`);

--
-- Indici per le tabelle `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`IdNota`);

--
-- Indici per le tabelle `personaleata`
--
ALTER TABLE `personaleata`
  ADD PRIMARY KEY (`IdATA`);

--
-- Indici per le tabelle `studente`
--
ALTER TABLE `studente`
  ADD PRIMARY KEY (`IdStudente`);

--
-- Indici per le tabelle `tecnico`
--
ALTER TABLE `tecnico`
  ADD PRIMARY KEY (`IdTecnico`);

--
-- Indici per le tabelle `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`IdTicket`),
  ADD KEY `Ticket_fk_Macroarea` (`IdMacroarea`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `accessibilità`
--
ALTER TABLE `accessibilità`
  MODIFY `IdAccessibilità` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `amministrativi`
--
ALTER TABLE `amministrativi`
  MODIFY `IdAmministrativi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `dirigenza`
--
ALTER TABLE `dirigenza`
  MODIFY `IdDirigenza` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `docente`
--
ALTER TABLE `docente`
  MODIFY `IdDocente` int(50) NOT NULL AUTO_INCREMENT;

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
  MODIFY `IdNota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `personaleata`
--
ALTER TABLE `personaleata`
  MODIFY `IdATA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `studente`
--
ALTER TABLE `studente`
  MODIFY `IdStudente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tecnico`
--
ALTER TABLE `tecnico`
  MODIFY `IdTecnico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `ticket`
--
ALTER TABLE `ticket`
  MODIFY `IdTicket` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `accessibilità`
--
ALTER TABLE `accessibilità`
  ADD CONSTRAINT `Accessibilità_fk_Macroarea` FOREIGN KEY (`IdMacroarea`) REFERENCES `macroarea` (`IdMacroarea`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `incarico`
--
ALTER TABLE `incarico`
  ADD CONSTRAINT `incarico_ibfk_1` FOREIGN KEY (`IdTicket`) REFERENCES `ticket` (`IdTicket`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `Ticket_fk_Macroarea` FOREIGN KEY (`IdMacroarea`) REFERENCES `macroarea` (`IdMacroarea`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
