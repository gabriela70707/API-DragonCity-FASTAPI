-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Tempo de geração: 28/04/2025 às 00:51
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dragon_city`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `dragoes`
--

CREATE TABLE `dragoes` (
  `id` int(11) NOT NULL,
  `nome` varchar(256) DEFAULT NULL,
  `categoria` varchar(256) DEFAULT NULL,
  `raridade` varchar(256) DEFAULT NULL,
  `foto_ovo` varchar(256) DEFAULT NULL,
  `foto_bebe` varchar(256) DEFAULT NULL,
  `foto_adulto` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `dragoes`
--

INSERT INTO `dragoes` (`id`, `nome`, `categoria`, `raridade`, `foto_ovo`, `foto_bebe`, `foto_adulto`) VALUES
(3, 'Dragão de Chamas', 'Fogo', 'Comum', 'http://localhost:8000/media/ovo/3_ovo.png', 'http://localhost:8000/media/bebe/3_bebe.png', 'http://localhost:8000/media/adulto/3_adulto.png'),
(4, 'Dragão da Terra', 'Terra', 'Comum', 'http://localhost:8000/media/ovo/4_ovo.png', 'http://localhost:8000/media/bebe/4_bebe.png', 'http://localhost:8000/media/adulto/4_adulto.png'),
(5, 'Dragão do Outono', 'Natureza', 'Comum', 'http://localhost:8000/media/ovo/5_ovo.png', 'http://localhost:8000/media/bebe/5_bebe.png', 'http://localhost:8000/media/adulto/5_adulto.png'),
(6, 'Dragão Elétrico', 'Elétrico', 'Comum', 'http://localhost:8000/media/ovo/6_ovo.png', 'http://localhost:8000/media/bebe/6_bebe.png', 'http://localhost:8000/media/adulto/6_adulto.png'),
(7, 'Dragão Metálico', 'Metal', 'Comum', 'http://localhost:8000/media/ovo/7_ovo.png', 'http://localhost:8000/media/bebe/7_bebe.png', 'http://localhost:8000/media/adulto/7_adulto.png'),
(8, 'Dragão do Mar', 'Água', 'Comum', 'http://localhost:8000/media/ovo/8_ovo.png', 'http://localhost:8000/media/bebe/8_bebe.png', 'http://localhost:8000/media/adulto/8_adulto.png'),
(9, 'Dragão de Gelo', 'Gelo', 'Comum', 'http://localhost:8000/media/ovo/9_ovo.png', 'http://localhost:8000/media/bebe/9_bebe.png', 'http://localhost:8000/media/adulto/9_adulto.png'),
(10, 'Dragão Mercúrio', 'Metal e Água', 'Comum', 'http://localhost:8000/media/ovo/10_ovo.png', 'http://localhost:8000/media/bebe/10_bebe.png', 'http://localhost:8000/media/adulto/10_adulto.png'),
(11, 'Dragão Natureza', 'Natureza', 'Comum', 'http://localhost:8000/media/ovo/11_ovo.png', 'http://localhost:8000/media/bebe/11_bebe.png', 'http://localhost:8000/media/adulto/11_adulto.png');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `dragoes`
--
ALTER TABLE `dragoes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `dragoes`
--
ALTER TABLE `dragoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
