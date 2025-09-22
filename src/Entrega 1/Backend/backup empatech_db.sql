-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: empatech_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `aluno_id` int(11) NOT NULL AUTO_INCREMENT,
  `equipe_id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `ra` varchar(8) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`aluno_id`),
  KEY `equipe_id` (`equipe_id`),
  CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`equipe_id`) REFERENCES `equipes` (`equipe_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,1,'Breno','11111111','breno@gmail.com','33333333333'),(2,2,'Guilherme','22222222','gui@gmail.com','44444444444'),(3,3,'Izabelli','99999999','izabelli@gmail.com','88888888888'),(4,4,'Rafael','44444444','rafael@gmail.com','66666666666'),(5,1,'Alexandre','44444444','ale@gmail.com','66666666666'),(6,2,'Henrique','44444444','hen@gmail.com','33333333333'),(7,4,'Daniela','44444444','dani@gmail.com','22222222222'),(8,3,'Rafaela','77777777','rafa@gmail.com','44444444444'),(9,2,'Pedro','56196812','pedro@gmail.com','23194198194');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avisos`
--

DROP TABLE IF EXISTS `avisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avisos` (
  `aviso_id` int(11) NOT NULL AUTO_INCREMENT,
  `mensagem` text NOT NULL,
  `data_publicacao` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`aviso_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avisos`
--

LOCK TABLES `avisos` WRITE;
/*!40000 ALTER TABLE `avisos` DISABLE KEYS */;
INSERT INTO `avisos` VALUES (1,'Oi!','2025-09-19 10:45:53');
/*!40000 ALTER TABLE `avisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campanhas`
--

DROP TABLE IF EXISTS `campanhas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campanhas` (
  `campanha_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_termino` date NOT NULL,
  `meta_dinheiro` decimal(10,2) DEFAULT 0.00,
  `meta_itens` int(11) DEFAULT 0,
  PRIMARY KEY (`campanha_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campanhas`
--

LOCK TABLES `campanhas` WRITE;
/*!40000 ALTER TABLE `campanhas` DISABLE KEYS */;
INSERT INTO `campanhas` VALUES (1,'2025/2','2025-12-31',10000.00,1000);
/*!40000 ALTER TABLE `campanhas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doacoes_dinheiro`
--

DROP TABLE IF EXISTS `doacoes_dinheiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doacoes_dinheiro` (
  `doacao_id` int(11) NOT NULL AUTO_INCREMENT,
  `equipe_id` int(11) NOT NULL,
  `campanha_id` int(11) DEFAULT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data` date NOT NULL,
  `modo` varchar(50) DEFAULT NULL,
  `doador` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`doacao_id`),
  KEY `equipe_id` (`equipe_id`),
  KEY `campanha_id` (`campanha_id`),
  CONSTRAINT `doacoes_dinheiro_ibfk_1` FOREIGN KEY (`equipe_id`) REFERENCES `equipes` (`equipe_id`) ON DELETE CASCADE,
  CONSTRAINT `doacoes_dinheiro_ibfk_2` FOREIGN KEY (`campanha_id`) REFERENCES `campanhas` (`campanha_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doacoes_dinheiro`
--

LOCK TABLES `doacoes_dinheiro` WRITE;
/*!40000 ALTER TABLE `doacoes_dinheiro` DISABLE KEYS */;
INSERT INTO `doacoes_dinheiro` VALUES (1,1,NULL,100.00,'2025-01-19','PIX',''),(2,2,NULL,200.00,'2025-02-19','PIX',''),(3,3,NULL,300.00,'2025-03-19','Dinheiro',''),(4,4,NULL,400.00,'2025-05-19','Transferência',''),(5,1,NULL,500.00,'2025-09-19','Outro',''),(6,4,NULL,1000.00,'2025-10-19','PIX',''),(7,3,1,600.00,'2025-06-19','PIX',''),(8,3,1,200.00,'2025-07-19','PIX',''),(9,4,1,1500.00,'2025-08-19','PIX',''),(10,3,1,200.00,'2025-08-19','PIX',''),(11,3,1,300.00,'2025-09-19','PIX',''),(12,2,1,500.00,'2025-09-19','PIX','');
/*!40000 ALTER TABLE `doacoes_dinheiro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipes`
--

DROP TABLE IF EXISTS `equipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipes` (
  `equipe_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `mentorNome` varchar(150) NOT NULL,
  `mentorRa` varchar(8) NOT NULL,
  `mentorEmail` varchar(100) NOT NULL,
  `mentorTelefone` varchar(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT 0.00,
  `alimentos` int(11) DEFAULT 0,
  PRIMARY KEY (`equipe_id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipes`
--

LOCK TABLES `equipes` WRITE;
/*!40000 ALTER TABLE `equipes` DISABLE KEYS */;
INSERT INTO `equipes` VALUES (1,'Equipe Esperança','João Silva','12345678','joao.silva@email.com','11999999999',2100.00,500),(2,'Equipe União','Maria Oliveira','23456789','maria.oliveira@email.com','11988888888',3000.50,920),(3,'Equipe Soliedariedade','Carlos Souza','34567890','carlos.souza@email.com','11977777777',2400.00,650),(4,'Equipe Proativa','Ana Santos','45678901','ana.santos@email.com','11966666666',2900.00,400);
/*!40000 ALTER TABLE `equipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoque_itens`
--

DROP TABLE IF EXISTS `estoque_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoque_itens` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque_itens`
--

LOCK TABLES `estoque_itens` WRITE;
/*!40000 ALTER TABLE `estoque_itens` DISABLE KEYS */;
INSERT INTO `estoque_itens` VALUES (1,'Arroz (5kg)','Grãos'),(2,'Feijão (1kg)','Grãos'),(3,'Óleo (900ml)','Óleos'),(4,'Açúcar (1kg)','Essenciais'),(5,'Café (500g)','Essenciais'),(6,'Leite (1L)','Laticínios'),(7,'Macarrão (500g)','Massas'),(8,'Molho de Tomate (340g)','Enlatados'),(9,'Farinha de Trigo (1kg)','Farináceos'),(10,'Fubá (500g)','Farináceos'),(11,'Sal (1kg)','Temperos');
/*!40000 ALTER TABLE `estoque_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familias`
--

DROP TABLE IF EXISTS `familias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familias` (
  `familia_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `regiao` varchar(50) NOT NULL,
  PRIMARY KEY (`familia_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familias`
--

LOCK TABLES `familias` WRITE;
/*!40000 ALTER TABLE `familias` DISABLE KEYS */;
INSERT INTO `familias` VALUES (1,'a','Zona Norte'),(2,'b','Zona Sul'),(3,'c','Zona Leste'),(4,'d','Zona Oeste'),(5,'e','Centro'),(6,'f','Zona Norte');
/*!40000 ALTER TABLE `familias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacoes_alimentos`
--

DROP TABLE IF EXISTS `transacoes_alimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacoes_alimentos` (
  `transacao_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `tipo` enum('Entrada','Saida') NOT NULL,
  `quantidade` int(11) NOT NULL,
  `data` datetime DEFAULT current_timestamp(),
  `equipe_id` int(11) DEFAULT NULL,
  `familia_id` int(11) DEFAULT NULL,
  `campanha_id` int(11) DEFAULT NULL,
  `nota_fiscal` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`transacao_id`),
  KEY `item_id` (`item_id`),
  KEY `equipe_id` (`equipe_id`),
  KEY `familia_id` (`familia_id`),
  KEY `campanha_id` (`campanha_id`),
  CONSTRAINT `transacoes_alimentos_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `estoque_itens` (`item_id`),
  CONSTRAINT `transacoes_alimentos_ibfk_2` FOREIGN KEY (`equipe_id`) REFERENCES `equipes` (`equipe_id`) ON DELETE SET NULL,
  CONSTRAINT `transacoes_alimentos_ibfk_3` FOREIGN KEY (`familia_id`) REFERENCES `familias` (`familia_id`) ON DELETE SET NULL,
  CONSTRAINT `transacoes_alimentos_ibfk_4` FOREIGN KEY (`campanha_id`) REFERENCES `campanhas` (`campanha_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacoes_alimentos`
--

LOCK TABLES `transacoes_alimentos` WRITE;
/*!40000 ALTER TABLE `transacoes_alimentos` DISABLE KEYS */;
INSERT INTO `transacoes_alimentos` VALUES (1,1,'Entrada',100,'2025-09-19 10:03:25',1,NULL,NULL,NULL),(2,2,'Entrada',200,'2025-09-19 10:03:51',2,NULL,NULL,NULL),(3,3,'Entrada',51,'2025-09-19 10:09:38',3,NULL,NULL,NULL),(4,4,'Entrada',49,'2025-09-19 10:10:48',1,NULL,NULL,NULL),(5,5,'Entrada',100,'2025-09-19 10:11:54',2,NULL,NULL,NULL),(6,9,'Entrada',49,'2025-09-19 10:24:02',3,NULL,NULL,'Novo(a) Documento de Texto.txt'),(7,11,'Entrada',51,'2025-09-19 10:24:52',1,NULL,NULL,'Novo(a) Documento de Texto.txt'),(8,6,'Entrada',50,'2025-09-19 10:28:58',4,NULL,NULL,'Novo(a) Documento de Texto.txt'),(9,7,'Entrada',200,'2025-09-19 10:29:38',3,NULL,NULL,'Novo(a) Documento de Texto.txt'),(10,8,'Entrada',100,'2025-09-19 10:29:38',3,NULL,NULL,'Novo(a) Documento de Texto.txt'),(11,10,'Entrada',100,'2025-09-19 10:30:37',2,NULL,NULL,'Novo(a) Documento de Texto.txt'),(12,4,'Entrada',100,'2025-09-19 10:32:52',4,NULL,NULL,'Novo(a) Documento de Texto.txt'),(13,3,'Entrada',50,'2025-09-19 10:36:10',3,NULL,NULL,'Novo(a) Documento de Texto.txt'),(14,11,'Entrada',50,'2025-09-19 10:36:10',3,NULL,NULL,'Novo(a) Documento de Texto.txt'),(15,1,'Entrada',200,'2025-09-19 10:39:57',4,NULL,NULL,'Novo(a) Documento de Texto.txt'),(16,2,'Entrada',100,'2025-09-19 10:41:44',1,NULL,NULL,'Novo(a) Documento de Texto.txt'),(17,1,'Saida',50,'2025-09-19 10:45:17',NULL,3,NULL,NULL),(18,5,'Entrada',20,'2025-09-19 11:24:19',2,NULL,1,NULL),(19,10,'Entrada',30,'2025-09-19 11:28:46',3,NULL,1,NULL),(20,7,'Entrada',100,'2025-09-19 11:33:40',2,NULL,1,NULL),(21,10,'Entrada',50,'2025-09-19 11:58:54',2,NULL,1,NULL);
/*!40000 ALTER TABLE `transacoes_alimentos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-19 13:08:56
