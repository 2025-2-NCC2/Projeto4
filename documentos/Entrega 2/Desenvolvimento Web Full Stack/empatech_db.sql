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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,1,'Breno','15487489','breno@gmail.com','32198712300'),(2,2,'Guilherme','10647987','gui@gmail.com','16797463016'),(3,3,'Izabelli','21638714','iza@gmail.com','15841613620'),(4,4,'Rafael','36645016','rafael@gmail.com','65419871203'),(5,1,'Leo','16845132','leo@gmail.com','68479811320'),(6,5,'Gerson','05447976','gerson@gmail.com','63418160326'),(7,6,'Marcos Pereira','32478198','marcos@gmail.com','64512798301'),(8,1,'Cristiano Ronaldo','77777777','cr7@gmail.com','77777777777');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avisos`
--

LOCK TABLES `avisos` WRITE;
/*!40000 ALTER TABLE `avisos` DISABLE KEYS */;
INSERT INTO `avisos` VALUES (1,'Oi!','2025-09-25 16:54:38'),(2,'Bom dia!','2025-10-14 11:25:33'),(3,'Reunião amanhã!','2025-10-14 11:25:43'),(4,'Boa noite!','2025-10-14 14:05:36'),(5,'Boa tarde!','2025-10-15 10:42:49');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campanhas`
--

LOCK TABLES `campanhas` WRITE;
/*!40000 ALTER TABLE `campanhas` DISABLE KEYS */;
INSERT INTO `campanhas` VALUES (1,'2025/2','2025-12-31',5000.00,500),(4,'2025/1','2025-06-30',15000.00,4000);
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
  `comprovante_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`doacao_id`),
  KEY `equipe_id` (`equipe_id`),
  KEY `campanha_id` (`campanha_id`),
  CONSTRAINT `doacoes_dinheiro_ibfk_1` FOREIGN KEY (`equipe_id`) REFERENCES `equipes` (`equipe_id`) ON DELETE CASCADE,
  CONSTRAINT `doacoes_dinheiro_ibfk_2` FOREIGN KEY (`campanha_id`) REFERENCES `campanhas` (`campanha_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doacoes_dinheiro`
--

LOCK TABLES `doacoes_dinheiro` WRITE;
/*!40000 ALTER TABLE `doacoes_dinheiro` DISABLE KEYS */;
INSERT INTO `doacoes_dinheiro` VALUES (1,1,1,100.00,'2025-01-25','PIX','',NULL),(2,2,1,200.00,'2025-02-25','PIX','',NULL),(3,3,NULL,300.00,'2025-03-25','Dinheiro','',NULL),(4,4,1,450.00,'2025-04-25','Transferência','',NULL),(5,5,1,100.00,'2025-10-10','Transferência','Anônimo',NULL),(6,5,1,200.00,'2025-11-10','PIX','Anônimo','uploads\\comprovante-1760108217641-501352899.jpg'),(8,5,1,500.00,'2025-06-15','Dinheiro','Breno',NULL),(9,1,1,1000.00,'2025-05-15','PIX','Lionel Messi','uploads\\comprovante-1760537991255-917293164.pdf');
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
  `senha` varchar(255) NOT NULL,
  `mentorNome` varchar(150) NOT NULL,
  `mentorRa` varchar(8) NOT NULL,
  `mentorEmail` varchar(100) NOT NULL,
  `mentorTelefone` varchar(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT 0.00,
  `alimentos` int(11) DEFAULT 0,
  PRIMARY KEY (`equipe_id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipes`
--

LOCK TABLES `equipes` WRITE;
/*!40000 ALTER TABLE `equipes` DISABLE KEYS */;
INSERT INTO `equipes` VALUES (1,'Equipe União','$2b$10$1tgmRWyG.XsvhUcYjhm9FOcOe96.A8GsMk7PN1gpBa3hBI9kCHoTy','João','99999999','joao@gmail.com','20694160306',1100.00,500),(2,'Equipe Esperança','$2b$10$PLKJnpXzCJpY9Sa.Rl69Mu6RvloA9FUz/x.VlrkyfHPfAWn4rhG/e','Joaquim','61964516','joaquim@gmail.com','23006149843',200.00,10),(3,'Equipe Solidariedade','$2b$10$/AQdoCMLy83/vNk5VJANQO8H0/PasH/K6gf0hNXTPSJbe7Yc8rCm2','Carlos','03418976','carlos@gmail.com','02316548746',300.00,205),(4,'Equipe Proativa','$2b$10$m5lGJBKVMEaz04tbeDUjAOZjOfPgfert5ljmGMV6AIaROSjJ/otXW','Ana','47126306','ana@gmail.com','03649741369',450.00,800),(5,'Equipe Fé','$2b$10$IoM2hlR2HZvxrIb0Nk2uE.6Xua9fpDanGPShbfdbv9za0RQ4awr2K','Pedro','20365496','pedro@gmail.com','38712208966',800.00,200),(6,'Equipe Ajuda','$2b$10$zPWp8dwF2GfnYMKjMB/.euCp3uPS74pgR1jxo9k/UGBYN9a2YXsTq','Kleber Silva','62196879','kleber@gmail.com','01149979715',0.00,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familias`
--

LOCK TABLES `familias` WRITE;
/*!40000 ALTER TABLE `familias` DISABLE KEYS */;
INSERT INTO `familias` VALUES (1,'a','Zona Norte'),(2,'b','Zona Norte'),(3,'c','Zona Sul'),(4,'d','Zona Leste'),(5,'e','Zona Oeste'),(6,'f','Centro'),(7,'g','Zona Sul'),(8,'h','Zona Norte'),(9,'i','Centro'),(10,'j','Zona Norte');
/*!40000 ALTER TABLE `familias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gestores`
--

DROP TABLE IF EXISTS `gestores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gestores` (
  `gestor_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`gestor_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gestores`
--

LOCK TABLES `gestores` WRITE;
/*!40000 ALTER TABLE `gestores` DISABLE KEYS */;
INSERT INTO `gestores` VALUES (1,'Breno','admin@empatech.com','$2b$10$JbHdYftarYt5nKKmBk5DWev3VswabBDO8sUFd7vWcRbxZpXNIsxQm');
/*!40000 ALTER TABLE `gestores` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacoes_alimentos`
--

LOCK TABLES `transacoes_alimentos` WRITE;
/*!40000 ALTER TABLE `transacoes_alimentos` DISABLE KEYS */;
INSERT INTO `transacoes_alimentos` VALUES (1,1,'Entrada',100,'2025-09-25 17:21:15',1,NULL,1,NULL),(2,2,'Entrada',100,'2025-09-25 17:21:15',1,NULL,1,NULL),(3,3,'Entrada',100,'2025-09-25 17:21:15',1,NULL,1,NULL),(4,4,'Entrada',100,'2025-09-25 17:21:15',1,NULL,1,NULL),(5,10,'Entrada',5,'2025-09-25 17:21:34',3,NULL,1,NULL),(6,8,'Entrada',10,'2025-09-25 17:21:48',2,NULL,1,NULL),(7,11,'Entrada',100,'2025-09-25 17:24:26',4,NULL,1,NULL),(8,5,'Entrada',250,'2025-09-25 17:24:26',4,NULL,1,NULL),(9,7,'Entrada',250,'2025-09-25 17:24:26',4,NULL,1,NULL),(10,8,'Entrada',100,'2025-09-30 11:25:20',3,NULL,1,NULL),(11,10,'Entrada',100,'2025-09-30 11:25:20',3,NULL,1,NULL),(12,2,'Entrada',100,'2025-10-10 11:57:51',5,NULL,1,'uploads\\notaFiscal-1760108271909-228867268.jpg'),(13,1,'Saida',5,'2025-10-14 11:05:54',NULL,5,NULL,NULL),(14,9,'Entrada',200,'2025-10-15 11:11:01',4,NULL,1,NULL),(15,6,'Entrada',100,'2025-10-15 11:11:22',5,NULL,1,NULL),(16,6,'Saida',50,'2025-10-15 11:11:39',NULL,9,NULL,NULL),(17,6,'Entrada',100,'2025-10-15 11:20:44',1,NULL,1,'uploads\\notaFiscal-1760538044269-947315712.pdf');
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

-- Dump completed on 2025-10-15 11:57:45
