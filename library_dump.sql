CREATE DATABASE  IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `library`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: library
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id_book` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `isbn` char(13) DEFAULT NULL,
  PRIMARY KEY (`id_book`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Rautatie','Juhani Aho','123-456-789-2'),(4,'C++','Teppo Testi','123-456-789-x'),(5,'Uusi Kirja','Liisa Virta','222-333-444-1'),(6,'C#','Ann Smith','123-456-789-x'),(7,'Java 2','Liisa Virta','222-333-444-1'),(8,'Frontend2','Matti Mainio','222-444-666-1'),(10,'C#','Ann Smith','123-456-789-x');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrower`
--

DROP TABLE IF EXISTS `borrower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrower` (
  `id_borrower` char(4) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_borrower`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrower`
--

LOCK TABLES `borrower` WRITE;
/*!40000 ALTER TABLE `borrower` DISABLE KEYS */;
INSERT INTO `borrower` VALUES ('a101','Teppo','Testi','$2a$10$QbnwhZAEzZ/IvqKNdvcVbuSi7Xs.0CXAsqYxMhlEVusVmEhgb7are',NULL),('a201','Liisa','Virta','$2a$10$UIt74FI3Hw4E0VUPdFvaje5C.bdZ17sxfOaWIZ8a3fPE6F6s6lDJC',NULL),('a202','Aino','Joki','pass03',NULL),('a205','Liisa','Virta','$2a$10$bbUkelCQ.I8YFbJjjUKaKeQikpMYZtJtbxq27XtwUCNFRA7EvULDy',NULL),('e101','Hiiro','Mikki','$2a$10$n/vdIfxQci.6sVU0VjVjP.4MhduL8IOBaeAklx798i9PJFo02q3V2','mikki1.png'),('e102','Koira','Musti','$2a$10$pIAsOS9uzRVt31CfqcNIU.BGOIV4owlPGKZyZNr4FOobfck38UH6G','dog1.jpg');
/*!40000 ALTER TABLE `borrower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrows`
--

DROP TABLE IF EXISTS `borrows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrows` (
  `id_borrows` int NOT NULL AUTO_INCREMENT,
  `id_borrower` char(4) DEFAULT NULL,
  `id_book` int DEFAULT NULL,
  `borrow_date` date DEFAULT (curdate()),
  `return_date` date DEFAULT NULL,
  PRIMARY KEY (`id_borrows`),
  KEY `id_borrower` (`id_borrower`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `borrows_ibfk_1` FOREIGN KEY (`id_borrower`) REFERENCES `borrower` (`id_borrower`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `borrows_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `book` (`id_book`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrows`
--

LOCK TABLES `borrows` WRITE;
/*!40000 ALTER TABLE `borrows` DISABLE KEYS */;
INSERT INTO `borrows` VALUES (1,'a101',1,'2022-10-28','2022-11-14'),(4,'a201',4,'2022-10-28','2022-11-12'),(8,'a201',4,'2022-10-28','2022-11-05'),(9,'a201',4,'2022-10-28','2022-11-07'),(10,'e101',1,'2022-10-28','2022-11-07'),(11,'e101',4,'2022-10-28','2022-11-07'),(12,'e102',6,'2022-10-28','2022-11-07'),(13,'e102',7,'2022-10-28','2022-11-07');
/*!40000 ALTER TABLE `borrows` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-30  8:08:44
