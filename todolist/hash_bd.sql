-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_categories` int NOT NULL AUTO_INCREMENT,
  `categories` varchar(45) DEFAULT NULL,
  `color` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_categories`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Работа',NULL),(2,'Личное',NULL),(3,'Важное',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id_department` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_department`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (0,'Отсутствует'),(1,'IT'),(2,'Кадры'),(3,'Отчёты'),(4,'Информатизации');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holydays`
--

DROP TABLE IF EXISTS `holydays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holydays` (
  `id_holidays` int NOT NULL,
  `this_year_holydays` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_holidays`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holydays`
--

LOCK TABLES `holydays` WRITE;
/*!40000 ALTER TABLE `holydays` DISABLE KEYS */;
INSERT INTO `holydays` VALUES (1,'1.1,2.1,3.1,4.1,5.1');
/*!40000 ALTER TABLE `holydays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notif_type`
--

DROP TABLE IF EXISTS `notif_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notif_type` (
  `id_notif_type` int NOT NULL AUTO_INCREMENT,
  `notif_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_notif_type`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notif_type`
--

LOCK TABLES `notif_type` WRITE;
/*!40000 ALTER TABLE `notif_type` DISABLE KEYS */;
INSERT INTO `notif_type` VALUES (1,'Задача'),(2,'Справка(готова)'),(3,'Справка(отказ)'),(4,'Справка(рассмотрение)'),(5,'Отпуск(принят)'),(6,'Отпуск(отказ)'),(7,'Отпуск(рассмотрение)');
/*!40000 ALTER TABLE `notif_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id_notif` int NOT NULL AUTO_INCREMENT,
  `fk_id_sender` int DEFAULT NULL,
  `fk_id_receiver` int DEFAULT NULL,
  `message` varchar(70) DEFAULT NULL,
  `checked` int DEFAULT NULL,
  `fk_id_notif_type` int DEFAULT NULL,
  PRIMARY KEY (`id_notif`),
  KEY `fk_id_notif_type_idx` (`fk_id_notif_type`),
  CONSTRAINT `fk_id_notif_type` FOREIGN KEY (`fk_id_notif_type`) REFERENCES `notif_type` (`id_notif_type`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (59,1,1,'Отпуск',1,7),(60,1,1,'Отпуск',1,6),(61,1,1,'Отпуск',1,5),(62,1,1,'Отпуск',0,5),(63,1,1,'Отпуск',0,6),(64,1,1,'Отпуск',1,6),(65,1,1,'Отпуск',1,5),(66,1,1,'Отпуск',1,6),(67,1,1,'Отпуск',1,7),(68,1,1,'Отпуск',1,6),(69,1,1,'Отпуск',1,7),(70,1,1,'Отпуск',1,5),(71,1,1,'Справка ндфл',0,4),(72,1,1,'Справка ндфл',0,2),(73,1,2,'vssssssssssss',0,1);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plea_categ`
--

DROP TABLE IF EXISTS `plea_categ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plea_categ` (
  `id_plea_categ` int NOT NULL AUTO_INCREMENT,
  `plea_categ` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_plea_categ`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plea_categ`
--

LOCK TABLES `plea_categ` WRITE;
/*!40000 ALTER TABLE `plea_categ` DISABLE KEYS */;
INSERT INTO `plea_categ` VALUES (1,'Увольнение'),(2,'Справка ндфл'),(3,'Отпуск');
/*!40000 ALTER TABLE `plea_categ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plea_status`
--

DROP TABLE IF EXISTS `plea_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plea_status` (
  `id_plea_status` int NOT NULL AUTO_INCREMENT,
  `plea_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_plea_status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plea_status`
--

LOCK TABLES `plea_status` WRITE;
/*!40000 ALTER TABLE `plea_status` DISABLE KEYS */;
INSERT INTO `plea_status` VALUES (0,NULL),(1,'Ожидает'),(2,'Выполнено'),(3,'Отказано');
/*!40000 ALTER TABLE `plea_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pleas`
--

DROP TABLE IF EXISTS `pleas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pleas` (
  `id_plea` int NOT NULL AUTO_INCREMENT,
  `fk_id_worker` int DEFAULT NULL,
  `fk_id_plea_categ` int DEFAULT NULL,
  `fk_id_plea_status` int DEFAULT NULL,
  `extra` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_plea`),
  KEY `fk_id_worker_idx` (`fk_id_worker`),
  KEY `fk_id_plea_categ_idx` (`fk_id_plea_categ`),
  KEY `fk_id_plea_status_idx` (`fk_id_plea_status`),
  CONSTRAINT `fk_id_plea_categ` FOREIGN KEY (`fk_id_plea_categ`) REFERENCES `plea_categ` (`id_plea_categ`),
  CONSTRAINT `fk_id_plea_status` FOREIGN KEY (`fk_id_plea_status`) REFERENCES `plea_status` (`id_plea_status`),
  CONSTRAINT `pleas_ibfk_1` FOREIGN KEY (`fk_id_worker`) REFERENCES `worker` (`id_worker`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pleas`
--

LOCK TABLES `pleas` WRITE;
/*!40000 ALTER TABLE `pleas` DISABLE KEYS */;
INSERT INTO `pleas` VALUES (31,1,3,3,'1.2.2021 - 26.2.2021'),(32,1,3,2,'1.2.2021 - 26.2.2021'),(37,1,1,0,'5.6.2021');
/*!40000 ALTER TABLE `pleas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id_role` int NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (-1,'admin'),(0,'Отсутствует'),(1,'Сотрудник'),(2,'Директор Отделения'),(3,'Главный Директор'),(4,'Кадровик');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `status` varchar(10) DEFAULT NULL,
  `status_color` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Активна','#1f4929'),(2,'Выполнена','#b68861'),(3,'Опоздание','#9e353a');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id_task` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `desc` varchar(45) DEFAULT NULL,
  `deadline` varchar(30) DEFAULT NULL,
  `fk_id_worker` int DEFAULT NULL,
  `fk_id_categories` int DEFAULT NULL,
  `fk_id_status` int NOT NULL DEFAULT '0',
  `fk_id_department` int DEFAULT NULL,
  PRIMARY KEY (`id_task`),
  KEY `fk_id_categories_idx` (`fk_id_categories`),
  KEY `fk_id_worker_idx` (`fk_id_worker`),
  KEY `fk_id_status` (`fk_id_status`),
  KEY `fk_id_department_idx` (`fk_id_department`),
  CONSTRAINT `fk_id_categories` FOREIGN KEY (`fk_id_categories`) REFERENCES `categories` (`id_categories`),
  CONSTRAINT `fk_id_status` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
  CONSTRAINT `fk_id_worker` FOREIGN KEY (`fk_id_worker`) REFERENCES `worker` (`id_worker`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`fk_id_department`) REFERENCES `department` (`id_department`)
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (250,'dsasdasadasdasddas','cxzxzczxczxczxcz','05.06.2021 - 10.12.2021',NULL,3,1,1),(251,'bbbbbbbbbbb','bbbbbbbbbbbbbbbbsa','05.06.2021 - 10.12.2022',1,2,2,1),(252,'zxcvvvvvv','vvvvvvvvvvvvxxxxxxxxxxxxx','05.06.2021 - 10.12.2021',1,1,1,1),(253,'bnnnnnnnnnnnnnnnnn','hhhhhhhhhhhhhhhhhh','05.06.2021 - 10.12.2021',1,1,1,1),(254,'ccxxxxxxxxx','bbbbbb','05.02.2021 - 10.12.2021',1,1,1,1),(255,'vvvvvvvvvvv','vssssssssssss','05.06.2021 - 10.12.2022',2,2,3,1);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vac_status`
--

DROP TABLE IF EXISTS `vac_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vac_status` (
  `id_vac_status` int NOT NULL AUTO_INCREMENT,
  `vac_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_vac_status`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vac_status`
--

LOCK TABLES `vac_status` WRITE;
/*!40000 ALTER TABLE `vac_status` DISABLE KEYS */;
INSERT INTO `vac_status` VALUES (1,'В процессе'),(2,'Подтверждено');
/*!40000 ALTER TABLE `vac_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `id_vacation` int NOT NULL AUTO_INCREMENT,
  `fk_id_worker` int DEFAULT NULL,
  `start_date` varchar(10) DEFAULT NULL,
  `end_date` varchar(10) DEFAULT NULL,
  `fk_id_vac_status` int DEFAULT NULL,
  PRIMARY KEY (`id_vacation`),
  KEY `fk_id_worker_idx` (`fk_id_worker`),
  KEY `fk_id_vac_status_idx` (`fk_id_vac_status`),
  CONSTRAINT `fk_id_vac_status` FOREIGN KEY (`fk_id_vac_status`) REFERENCES `vac_status` (`id_vac_status`),
  CONSTRAINT `vacation_ibfk_1` FOREIGN KEY (`fk_id_worker`) REFERENCES `worker` (`id_worker`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (69,1,'1.2.2021','26.2.2021',2);
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker`
--

DROP TABLE IF EXISTS `worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worker` (
  `id_worker` int NOT NULL AUTO_INCREMENT,
  `lname` varchar(45) DEFAULT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `mname` varchar(45) DEFAULT NULL,
  `login` varchar(45) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `fk_id_role` int DEFAULT NULL,
  `fk_id_department` int NOT NULL DEFAULT '0',
  `number` char(14) DEFAULT NULL,
  `room` char(5) DEFAULT NULL,
  `vacation_left` int DEFAULT NULL,
  PRIMARY KEY (`id_worker`),
  KEY `fk_id_role_idx` (`fk_id_role`),
  KEY `fk_id_department` (`fk_id_department`),
  CONSTRAINT `fk_id_department` FOREIGN KEY (`fk_id_department`) REFERENCES `department` (`id_department`),
  CONSTRAINT `fk_id_role` FOREIGN KEY (`fk_id_role`) REFERENCES `role` (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker`
--

LOCK TABLES `worker` WRITE;
/*!40000 ALTER TABLE `worker` DISABLE KEYS */;
INSERT INTO `worker` VALUES (1,'Саморуков','Александр','Александрович','samor','$2b$04$v4v5s8KIEet0JAZoH5vcE.JavksDikYL0fWiVv4OQN3DDP10ulsyO','samor@mail.ru',3,1,'321321','222',2),(2,'Петро','Мид','Никитич','petrov','$2b$04$rc6P7jPAmz6mWFLYDKwgNOM9nB5kXXFVJSPlC4R4N6qZDvr28EBOK','petrovich@mail.ru',2,1,'321123','521',NULL),(3,'Самосбор','Кроватов','Лагович','samosb','$2b$04$m/92.ZdiKeHPvPDzHQwDz.nEhoPCM6sAnGoqMAc4wDKkAmEo9XuVG','samosb@mail.ru',4,3,'46431','135',NULL),(5,'Елисеев',' Александр','Васильевич','eliseev','$2b$04$wrXx4cp6g0aycxHaALMRMOhTFaLi9NnQE2N.lSxfCBVIZYEVOEiS2','eliseev@mail.ru',1,2,'32145','213',NULL),(6,'Лапин','Родион','Алексеевич','lapin','$2b$04$bG9RGR4otbdcCkwSCBnFgeDi8ed5kbDNEcZVkOqh84MHZ.eWAf0Hq','lapin@mail.ru',2,2,'38052','012',NULL),(7,'Сидоров','Наум',' Степанович','sidorov','$2b$04$i6qlr3CLwx7qtMCNCW5g1OWcX2IaNl6UAXWfUaDFdhzqYGOU57Zmm','sidorov@mail.ru',3,2,'90901','014',NULL),(8,'Шаров','Платон','Владленович','sharov','$2b$04$sJkGcQoQqKgX99A9NDape.k0CvJ2Hj/oYN8nrxISLChaujovquZru','sharov@mail.ru',1,3,'09914','019',NULL),(9,'Кабанов','Аверьян','Артемович','kabanov','$2b$04$ek4rpl90lZbmTTW5JcLRyeiuskN2IP2hXjzCmmFAQlb6smqbvOqna','kabanov@mail.ru',2,3,'02134','314',NULL),(11,'Воронов ','Евгений','Артемович','voronov','$2b$04$u8ZAPBoSN.fe8DGcjtkWdunJ1/Ia4KEAk8WKNiZ9UmhZ1SgjX2JS2','voronov@mail.ru',3,3,'5921','302',NULL),(12,'dsadsa','fdfd','xczczx','lofkes','$2b$10$7LNNdswsPeQ86GH8QaQDAu2.fCbQmAZ3A903yQcs0vW7SfoNpbd6m','lofkes@mail.ru',0,0,NULL,NULL,NULL),(13,'ccxcvvvv','dsadsdscx','bvnbnb','dadsa','$2b$05$ctf2w5Do0fYTUnlNl0E2oOtKNR/VP.XZeHgN5qL0.yGBwyHssU9P.','sam2or@mail.ru',0,0,NULL,NULL,NULL),(14,'bvbvvcb','vcxvxcvx','nbnmnm','vcccccccccc','$2b$04$XPbKqGvwik1Vq7WfH.69uu.b8mXBNqlsH4nmtDmujz2.jlh.HGR1W','samo11r@mail.ru',0,0,NULL,NULL,NULL),(15,'mnnnnnnnn','nbbbbbbbb','dsammmmmmmmmmm','dasasdasd','$2b$04$W4nOaSHvC0uF3m.S3IUZaubV5tPrxZmAt1e.rrByzKA1Cu/H3W4e.','samor1@mail.ru',0,0,NULL,NULL,NULL),(16,'dsaadsads','dsadasad','dsadsaasd','samor','$2b$04$v4v5s8KIEet0JAZoH5vcE.JavksDikYL0fWiVv4OQN3DDP10ulsyO','samor@mail.ru',0,0,NULL,NULL,NULL),(17,'admin','admin','admin','admin','$2b$04$kp065W3X9fmMiIP0O4ddkOolMXCX9ckzAbtn1sJmuuaML/lNIXp6.','admin',-1,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `worker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-05 21:42:36
