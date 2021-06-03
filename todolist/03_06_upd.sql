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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Работа',NULL),(2,'Личное',NULL),(3,'Важно',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (59,1,1,'Отпуск',1,7),(60,1,1,'Отпуск',1,6),(61,1,1,'Отпуск',1,5),(62,1,1,'Отпуск',0,5),(63,1,1,'Отпуск',0,6),(64,1,1,'Отпуск',1,6),(65,1,1,'Отпуск',1,5),(66,1,1,'Отпуск',1,6),(67,1,1,'Отпуск',1,7),(68,1,1,'Отпуск',1,6),(69,1,1,'Отпуск',1,7),(70,1,1,'Отпуск',1,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pleas`
--

LOCK TABLES `pleas` WRITE;
/*!40000 ALTER TABLE `pleas` DISABLE KEYS */;
INSERT INTO `pleas` VALUES (31,1,3,3,'1.2.2021 - 26.2.2021'),(32,1,3,2,'1.2.2021 - 26.2.2021');
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
  PRIMARY KEY (`id_task`),
  KEY `fk_id_categories_idx` (`fk_id_categories`),
  KEY `fk_id_worker_idx` (`fk_id_worker`),
  KEY `fk_id_status` (`fk_id_status`),
  CONSTRAINT `fk_id_categories` FOREIGN KEY (`fk_id_categories`) REFERENCES `categories` (`id_categories`),
  CONSTRAINT `fk_id_status` FOREIGN KEY (`fk_id_status`) REFERENCES `status` (`id_status`),
  CONSTRAINT `fk_id_worker` FOREIGN KEY (`fk_id_worker`) REFERENCES `worker` (`id_worker`)
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (5,'номер 5','описание номера 5выфвыфвфывфывфывфывфы','12.12.2020 - 13.01.2021',NULL,1,3),(172,'dsadas','dsadasdas','12.12.2020 - 13.01.2021',NULL,2,1),(174,'dsadsa','dsadsa22222222','12.12.2020 - 13.01.2021',NULL,3,3),(175,'xzcxz','vxcv','12.12.2020 - 13.01.2021',NULL,3,3),(177,'kjhjuydsadsadsadsadasdas','kjh','12.12.2020 - 13.01.2022',NULL,1,3),(181,'dsada','dsada','12.12.2020 - 13.01.2021',NULL,2,3),(182,NULL,'dasdasdas','12.12.2020 - 13.01.2021',NULL,2,2),(183,NULL,'321312dsa','12.12.2020 - 13.01.2021',NULL,1,3),(184,'NEW NAME','NEW DESC','12.12.2020 - 13.01.2021',2,3,3),(185,'2222222222','333333333333335','12.12.2020 - 13.01.2021',1,3,3),(186,'321','321','12.12.2020 - 13.01.2021',NULL,1,3),(187,'66666','777777','12.12.2020 - 13.01.2021',NULL,1,3),(188,'не прогорело','прогорело чёрт побери','02.04.2021 - 12.06.2021',1,3,3),(189,'22222','11111','02.04.2021 - 12.06.2021',NULL,2,3),(190,'213231','321321','',NULL,2,2),(191,NULL,'','',NULL,1,1),(192,NULL,'','',NULL,1,1),(193,NULL,'5555555555555522222222','02.04.2021 - 12.06.2021',9,3,3),(194,'321231','321321312','12.12.2020 - 13.01.2021',NULL,2,1),(195,'321231','321321312','12.12.2020 - 13.01.2021',NULL,2,1),(196,'321231','321321312','12.12.2020 - 13.01.2021',NULL,2,1),(197,'выфвыф','вфывфы','12.12.2020 - 13.01.2021',NULL,2,2),(198,'dsa','das','12.12.2020 - 13.01.2021',NULL,1,1),(199,'dsa','das','12.12.2020 - 13.01.2021',NULL,1,1),(200,'dsa','dsa','12.12.2020 - 13.01.2021',NULL,2,2),(201,'321132','321123','12.12.2020 - 13.01.2021',NULL,1,1),(202,'dasdsa','dddddddddddd','12.12.2020 - 13.01.2021',NULL,1,1),(203,'dsadsa','dsadas','12.12.2020 - 13.01.2021',NULL,1,1),(204,'dsadsa','dsadas','12.12.2020 - 13.01.2021',NULL,1,1),(205,NULL,'321312dsa','12.12.2020 - 13.01.2021',NULL,2,3),(206,NULL,'888888888777','12.12.2020 - 13.01.2025',1,1,3),(207,NULL,'nnnnnnnnnnnnnnnnnv','02.04.2021 - 12.06.2021',1,2,3),(208,NULL,'pooipoip','02.04.2021 - 12.06.2028',2,2,3),(209,NULL,'пппппппппппппп','02.04.2021 - 12.06.2025',2,2,3),(210,NULL,'пппппппппппппп','02.04.2021 - 12.06.2025',2,1,3),(211,NULL,'пппппппппппппп','02.04.2021 - 12.06.2025',2,2,3),(212,NULL,'пппппппппппппп','02.04.2021 - 12.06.2025',2,1,3),(213,NULL,'пппппппппппппп','02.04.2021 - 12.06.2025',2,1,3),(214,NULL,'dsaaaa','02.04.2021 - 12.06.2025',6,1,3),(215,NULL,'dsaaaa','02.04.2021 - 12.06.2222',6,1,3),(216,'333333333111111111111','11111111333333333333333','12.12.2020 - 13.01.2021',3,1,3),(217,'321321','321132','321321',NULL,2,2),(218,'321321213','4214124','421421124',NULL,2,2),(219,'321132321','32213132','02.04.2021 - 12.06.2021',NULL,2,3),(220,'231312213231','12321132132','02.04.2021 - 12.06.2021',9,3,3),(221,'321231231','321321231','231321321',NULL,2,2),(222,'321231231','321321231','231321321',NULL,2,2),(223,'321231123','231231321','213321312',NULL,2,2),(224,'321231123','231231321','213321312',NULL,2,2),(225,'321231123','231231321','213321312',NULL,2,2),(226,'321231123','231231321','213321312',NULL,2,2),(227,'321321132','123312123','321123312',NULL,2,2),(228,'jjhgjhjjhjhjh','dfs','02.04.2021 - 12.06.2021',9,2,3),(229,'321321132','descitionaaaa','02.04.2021 - 12.06.2021',9,2,3),(230,'321213213321','фвффвыфвыфыв','3123',NULL,2,3),(231,'GGGGGGGGGGGGG','VVVVVVVVVVVVVVVVVVV','3123',NULL,2,3),(232,'312dsdsa','231213231','вфывфывыф',NULL,1,2),(233,'выффывфывфвы','выффвыфвывфы','выффвыфвы',NULL,2,1),(234,'выффывфывфвы','выффвыфвывфы','выффвыфвы',NULL,2,2),(235,'231231321','dasdasdas','dsasdadas',NULL,2,2),(236,'321312132','dadssad','dsadsa',NULL,2,1),(237,'231123321','dasdsadas','dasdsadas',NULL,2,3),(238,'2131213','321321312','dsadas',NULL,3,2),(239,'321321','dsadsa','dsadas',NULL,2,3),(240,'321321','dsadsa','dsadas',NULL,2,3),(241,'321321','dsadsa','dsadas',NULL,2,3),(242,'321321','dsadsa','dsadas',NULL,2,3),(243,'321231','231312321','321123312',NULL,2,2),(244,'3213','321321','321321',NULL,3,2),(245,'3213','321321','321321',NULL,3,2),(246,'3312312321','aasdasdads','12.12.2020 - 13.01.2021',1,2,3),(247,'3312312321','aasdasdads','12.12.2020 - 13.01.2021',1,2,3);
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
  `pass` varchar(45) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker`
--

LOCK TABLES `worker` WRITE;
/*!40000 ALTER TABLE `worker` DISABLE KEYS */;
INSERT INTO `worker` VALUES (1,'Саморуков','Александр','Александрович','samor','123','samor@mail.ru',3,3,'321321','222',2),(2,'Петро','Мид','Никитич','petrov','321','petrovich2@mail.ru',2,1,'321123','521',NULL),(3,'Самосбор','Кроватов','Лагович','samosb','222','samosb@mail.ru',4,3,'46431','135',NULL),(5,'Елисеев',' Александр','Васильевич','eliseev','321123','eliseev@mail.ru',1,2,'32145','213',NULL),(6,'Лапин','Родион','Алексеевич','lapin','321123','lapin@mail.ru',2,2,'38052','012',NULL),(7,'Сидоров','Наум',' Степанович','sidorov','321123','sidorov@mail.ru',3,2,'90901','014',NULL),(8,'Шаров','Платон','Владленович','sharov','321123','sharov@mail.ru',1,3,'09914','019',NULL),(9,'Кабанов','Аверьян','Артемович','kabanov','09132','kabanov@mail.ru',2,3,'02134','314',NULL),(10,'admin','admin','admin','admin','admin','admin',-1,0,'3331','42',NULL),(11,'Воронов ','Евгений','Артемович','voronov','32145','voronov@mail.ru',3,3,'5921','302',NULL);
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

-- Dump completed on 2021-06-03 20:58:41
