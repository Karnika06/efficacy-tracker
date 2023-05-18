-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: efficacytracker
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `contactNumber` bigint DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `role` varchar(45) DEFAULT 'employee',
  `age` int DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `marital_status` varchar(45) DEFAULT NULL,
  `team` varchar(45) DEFAULT NULL,
  `job_role` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `avatar` varchar(600) DEFAULT NULL,
  `fb_link` longtext,
  `linkedin_link` longtext,
  `twitter_link` longtext,
  `dob` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `verification_token` varchar(100) DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (25,'Karnika Brijpuria','karnika1@gmail.com',9044004128,'$2b$10$5ZjU6/bm4ZaGwJfhqbZvDeT/5I3q7U09yQ7GYk8vGhjFbfEA81DF2','admin',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(26,'Sanya','sanya@gmail.com',9044004128,'$2b$10$zTQbjfumVCutSXOSsCPU1.TnragdGee8ZCjJf208pq9yoO45eBxni',NULL,28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(27,'Rohan Gupta','rohan@gmail.com',9044004126,'$2a$10$rnz9uMVYS2QxGevjMSv17.MWgZqELcRnCzBXdy9Fz5iRagcipYgde','Senior Software Engineer',29,'Male','Single','DEV','Senior Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.','https://firebasestorage.googleapis.com/v0/b/efficacy-tracker.appspot.com/o/employee%20-%2027?alt=media&token=396f51da-d2eb-487f-8221-b8aa58e8a3b8','facebook.com','linkedIn.comq','twitter.com','1994-09-17','addfesdfvds dfgvsdh as',1,NULL,'2023-05-16 09:49:14'),(28,'Manuj Gupta','manuj621@gmail.com',9044004128,'$2b$10$cUbQUcS3mrVGs5Z/YXju3uXQQlcgUyKqBUh/rREtIgoswQ11gANH6','Developer',28,'Male','Single','DEV','Developer','Hi, I’m Manuj. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1996-11-05','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(29,'Tathagat','tathagat@gmail.com',9044004128,'$2b$10$qCLcOsk0hXu8eJpbBryqtO861LXeA496t7VRqgnyCAJ0TN0L5z3Tu','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(30,'Khushboo','khushboo@gmail.com',9044004128,'$2b$10$zaT3PyBzwsqYhNRc1UYf/.PQzKOwNOKPi.jH.HnwB3zz0zcUFaUM2','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(61,'Rohit Brijpuria','rohit@gmail.com',9044004128,'$2b$10$Sb8cTnyh6lOio3knVDSH5.h38qpsl1/WQcuwiDcH81KPPpla4BaIi','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(75,'Ruchi Gupta','ruchi@gmail.com',9044004128,'$2b$10$tIAYHnOX7HJ/DkzzTmOwOOzYeK0HCPrKS83TsXPOq6pxdHsDZAZrm','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(76,'Anjali Singh','anjali@gmail.com',9044004128,'$2b$10$VNrJOj0KNYQ3caP4LCsdGe4mGeUJ6iuRcM5XlWnMjZKLDRFJYy/zq','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(77,'Raavi Mishra','raavi@gmail.com',9044004128,'$2b$10$mW7Q9XBDrA8JjZvMnOv1V.NeYII2T8R9RLLztdo1exm2d5FAgaj6a','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(78,'Saumya Gutpa','saumya@gmail.com',9044004128,'$2b$10$YpfS1KL1jmLzAORZS2rPkOU1f7FXsy2a9zDUc3RbjmpT0IFz3cU9i','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(79,'Shalini Sharma','shalini@gmail.com',9044004128,'$2b$10$dS3AP/iNcLmVBb.n6tXOjuFQQfeP664/PxY/ZuA6Dcu9nzg5Y9reS','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(80,'Raman Dixit','raman@gmail.com',9044004128,'$2b$10$mIJGBuNeGRiOY.kbDMF66eUJjCbbWTkzfv1np.0d//7jnRN..x5Vy','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(82,NULL,NULL,9044004128,NULL,'employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(83,'Ruhi Sharma','ruhi@gmail.com',9044004128,'$2b$10$JdlE07/jZPzwgfEUXMBHA.3VkHYwM8JKXqxfxwhfPuJ4rIEmFiNIm','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(84,'Rimmy Singh','rimmy@gmail.com',9044004128,'$2b$10$8hAkXRP5/GJXSb4NCujm5OkST5Y0TRBhDvgfL1UHX5oH/9woQVCuq','employee',28,'Male','Single','DEV','Developer','Hi, I’m Rohan. I’m amazing. I’m super knowledgeable, creative, and intelligent. I’m at the cutting edge of my field and I’m quite skilled in all things business-related.',NULL,'gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','gfujyfv/nikhnl/knk','1994-09-20','addfesdfvds dfgvsdh as',NULL,NULL,'2023-05-16 09:49:14'),(93,'Karnika Brijpuria','karnika621@gmail.com',9044004164,'$2b$10$TTFWC2qqDQiD5jnjx7/uWuvhcThrqTWBXS4Kfc.WA.qTxyR01dWDO','employee',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,'2023-05-16 13:35:31'),(94,'Karnika Brijpuria','karnikabrijpuria@gmail.com',9044004164,'$2b$10$G2Sstx8cy8kEv03S0P48ruSinQL3mIYhMbCZBw5c/ppngtqygS88a','employee',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,'2023-05-16 15:05:25'),(95,'Karnika Brijpuria','btbti19119_karnika@banasthali.in',7084999757,'$2b$10$psm49QFfO0OHArqGyN10ieKu0CAKNwhpnuIQOs/GQYMTKQUtXrgR.','employee',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,'2023-05-16 17:57:14');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `feedback` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`),
  KEY `id_idx` (`employee_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (2,25,'Improve management',NULL),(5,25,'Developers team is working very well','2023-02-08 19:17:18'),(6,25,'We can have a seminar on management','2023-02-08 19:17:50');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mood`
--

DROP TABLE IF EXISTS `mood`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mood` (
  `idmood` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `employee_mood` varchar(45) NOT NULL,
  `mood_reasons` json DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `mood_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idmood`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mood`
--

LOCK TABLES `mood` WRITE;
/*!40000 ALTER TABLE `mood` DISABLE KEYS */;
INSERT INTO `mood` VALUES (2,27,'Neutral','[\"Health\", \"Task area/Activity\", \"Payment\", \"Leadership\"]','Too many tasks','2023-04-30 11:51:38');
/*!40000 ALTER TABLE `mood` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `task_name` varchar(500) DEFAULT NULL,
  `task_desc` varchar(200) DEFAULT NULL,
  `task_status` varchar(45) DEFAULT NULL,
  `task_duration` varchar(45) DEFAULT NULL,
  `task_priority` varchar(45) DEFAULT NULL,
  `task_level` varchar(45) DEFAULT NULL,
  `dueDate` datetime DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`),
  KEY `id_idx` (`employee_id`),
  CONSTRAINT `id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,30,'Made frontend',NULL,'Stuck','2','3','Medium','2023-01-25 00:00:00','2023-01-26 00:00:00','2023-01-26 19:41:30'),(2,27,'Working on backend and designing','Website needs proper backend to work on frontend','Done','288','5','Hard','2023-01-27 02:00:00','2023-01-15 02:00:00','2023-01-26 20:13:08'),(4,27,'Need to solve backend error','Website needs proper backend to work on frontend','Working on it','120','4','Hard','2023-01-26 13:00:00','2023-01-21 13:00:00','2023-01-26 20:14:53'),(5,27,'To attend a meeting change','Discuss about the further tasks','Done','7','2','Easy','2023-01-26 13:00:00','2023-01-26 05:30:00','2023-01-26 21:32:37'),(6,27,'To research about formik','I wanted to use formik to create forms in this project instead of using traditional way','Working on it','24','2','Medium','2023-01-27 07:30:00','2023-01-26 07:30:00','2023-01-27 15:39:08'),(8,29,'To attend workshop',NULL,'Not started','2','3','Easy','2023-01-30 00:00:00','2023-01-30 00:00:00','2023-01-28 19:17:12'),(9,29,'To work on APIs',NULL,'Stuck','2','3','Medium','2023-01-30 00:00:00','2023-01-30 00:00:00','2023-01-28 19:20:16'),(10,29,'To work on Admin page',NULL,'Stuck','2','3','Medium','2023-01-30 00:00:00','2023-01-30 00:00:00','2023-01-28 19:22:31'),(11,29,'To work on Dashboard page',NULL,'Stuck','2','3','Medium','2023-01-30 00:00:00','2023-01-30 00:00:00','2023-01-28 19:22:39'),(12,29,'To work on Dashboard page',NULL,'Stuck','2','3','Medium','2023-01-30 00:00:00','2023-01-30 00:00:00','2023-01-28 19:22:42'),(13,27,'Training session with interns','To get to know about the company','Not started','144','4','Medium','2023-01-31 18:30:00','2023-01-25 18:30:00','2023-01-28 20:09:13'),(14,27,'To read research papers',NULL,'Done','96','5','Hard','2023-02-01 18:30:00','2023-01-28 18:30:00','2023-01-28 20:42:18'),(15,28,'Workshop attended',NULL,'Done','4','3','Medium','2023-01-27 18:30:00','2023-01-27 14:30:00','2023-01-28 22:19:01'),(16,28,'Attended lecture',NULL,'Done','2','2','Easy','2023-01-28 20:30:00','2023-01-28 18:30:00','2023-01-28 22:27:50'),(24,27,'Read research paper',NULL,'Done','72','4','Medium','2023-02-01 18:30:00','2023-01-29 18:30:00','2023-01-29 22:44:38'),(25,25,'Worked on feedback data',NULL,'Done','4','2','Easy','2023-02-07 00:00:00','2023-02-07 00:00:00','2023-02-10 15:23:54'),(26,25,'Previous task debugging',NULL,'Working on it','2','3','Medium','2023-02-08 00:00:00','2023-02-09 00:00:00','2023-02-10 15:26:02'),(27,27,'Worked on session service',NULL,'Stuck','24','4','Hard','2023-02-08 18:30:00','2023-02-07 18:30:00','2023-02-10 15:40:13'),(28,27,'Trying toastify','Toastify will increase user experience to display messages','Working on it','2','3','Medium','2023-02-11 18:30:00','2023-02-11 16:30:00','2023-02-13 13:54:41'),(29,27,'Working on toastify',NULL,'Working on it','1','3','Medium','2023-02-11 19:30:00','2023-02-11 18:30:00','2023-02-13 14:36:18'),(30,27,'Toastify not working','I am using toastify to display toast to help user to interact with the website efficiently','Done','22','4','Hard','2023-02-11 15:50:00','2023-02-10 17:00:00','2023-02-13 14:37:53'),(32,27,'Debugging notification problem',NULL,'Stuck','28','3','Medium','2023-02-10 18:30:00','2023-02-09 14:30:00','2023-02-13 14:41:40'),(33,27,'Give session on how to build this project up',NULL,'Not started','48','3','Medium','2023-02-09 18:30:00','2023-02-07 18:30:00','2023-02-13 14:44:53'),(37,75,'Research about some topics',NULL,'Working on it','2','4','Medium','2023-02-12 00:00:00','2023-02-12 00:00:00','2023-02-15 04:35:17'),(38,77,'work completed',NULL,'Done','5','4','Hard','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 14:47:55'),(39,77,'work completed',NULL,'Done','5','4','Hard','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 14:48:14'),(40,77,'To attend a meeting',NULL,'Not started','1','2','Easy','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 14:53:08'),(41,77,'To attend a meeting',NULL,'Not started','1','2','Easy','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 14:53:19'),(42,77,'To attend a meeting',NULL,'Not started','1','2','Easy','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 15:32:13'),(43,77,'To attend a meeting',NULL,'Not started','1','2','Easy','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 15:32:15'),(44,77,'To attend a meeting',NULL,'Not started','1','2','Easy','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 15:32:16'),(45,77,'To attend a meeting',NULL,'Not started','1','2','Easy','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 15:32:18'),(46,77,'To attend a meeting',NULL,'Not started','1','2','Easy','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 15:32:20'),(48,77,'Working on backend',NULL,'Done','5','4','Medium','2023-02-15 00:00:00','2023-02-15 00:00:00','2023-02-16 15:45:40'),(49,27,'work completed','Completed todays daily task','Done','18','3','Easy','2023-02-19 12:30:00','2023-02-18 18:30:00','2023-02-20 05:22:49'),(50,27,'Made frontend',NULL,'Done','144','3','Easy','2023-03-08 18:30:00','2023-03-02 18:30:00','2023-03-02 09:12:12'),(52,27,'Made frontend',NULL,'Working on it','2','4','Medium','2023-03-08 00:00:00','2023-03-03 00:00:00','2023-03-02 09:12:44'),(53,27,'Made frontend',NULL,'Working on it','2','4','Medium','2023-03-08 00:00:00','2023-03-03 00:00:00','2023-03-02 09:12:45'),(54,27,'Made frontend',NULL,'Done','2','4','Medium','2023-03-08 00:00:00','2023-03-03 00:00:00','2023-03-02 09:12:45'),(55,27,'Made frontend',NULL,'Working on it','2','4','Medium','2023-03-08 00:00:00','2023-03-03 00:00:00','2023-03-02 09:12:46'),(56,27,'Made frontend',NULL,'Working on it','2','4','Medium','2023-03-08 00:00:00','2023-03-03 00:00:00','2023-03-02 09:12:46'),(57,27,'Made frontend',NULL,'Working on it','2','4','Medium','2023-03-08 00:00:00','2023-03-03 00:00:00','2023-03-02 09:12:46'),(58,27,'Made frontend',NULL,'Working on it','2','4','Medium','2023-03-08 00:00:00','2023-03-03 00:00:00','2023-03-02 09:12:46'),(59,27,'Made frontend',NULL,'Working on it','2','4','Medium','2023-03-08 00:00:00','2023-03-03 00:00:00','2023-03-02 09:12:46'),(60,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:04'),(61,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:04'),(62,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:04'),(63,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:04'),(64,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:04'),(65,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:05'),(66,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:05'),(67,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:05'),(68,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:05'),(69,27,'work completed',NULL,'Done','24','3','Medium','2023-03-06 18:30:00','2023-03-05 18:30:00','2023-03-05 16:06:05'),(70,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:42'),(71,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:50'),(72,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:51'),(73,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:51'),(74,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:51'),(75,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:51'),(76,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:51'),(77,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:51'),(78,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:52'),(79,28,'Working on backend',NULL,'Working on it','2','3','Medium','2023-03-30 00:00:00','2023-03-29 00:00:00','2023-03-17 18:52:54'),(80,27,'Completed Update profile','Need to add this feature for the user to update their profile','Done','168','4','Medium','2023-03-15 18:30:00','2023-03-08 18:30:00','2023-03-21 10:10:11'),(81,27,'Completed Update profile',NULL,'Done','168','4','Medium','2023-03-15 18:30:00','2023-03-08 18:30:00','2023-03-21 10:10:15'),(82,27,'Learning data visualization',NULL,'Working on it','120','5','Medium','2023-03-14 18:30:00','2023-03-09 18:30:00','2023-03-21 10:10:53'),(83,27,'Learning data visualization',NULL,'Done','120','5','Medium','2023-03-14 18:30:00','2023-03-09 18:30:00','2023-03-21 10:10:55'),(84,27,'Worked on graphs',NULL,'Done','240','5','Medium','2023-03-19 18:30:00','2023-03-09 18:30:00','2023-03-21 10:11:31'),(86,27,'Calculating efficiency',NULL,'Working on it','190','5','Medium','2023-03-26 11:40:00','2023-03-18 13:40:00','2023-03-26 13:43:23'),(87,27,'Calculating efficiency',NULL,'Working on it','187','5','Medium','2023-03-26 14:10:00','2023-03-18 19:10:00','2023-03-26 13:45:10'),(88,27,'Rectified Date bugs',NULL,'Done','12','5','Medium','2023-03-26 23:00:00','2023-03-26 11:00:00','2023-03-26 18:29:19'),(89,27,'Graph result checking',NULL,'Done','11','5','Medium','2023-03-27 23:00:00','2023-03-27 12:00:00','2023-03-27 09:14:05'),(90,27,'Data checking',NULL,'Done','11','5','Medium','2023-03-27 23:00:00','2023-03-27 12:00:00','2023-03-27 09:14:21'),(91,27,'Data checking',NULL,'Done','11','5','Medium','2023-03-27 23:00:00','2023-03-27 12:00:00','2023-03-27 09:14:21'),(92,27,'Graph showing wrong results',NULL,'Done','9','5','Medium','2023-03-27 23:00:00','2023-03-27 14:00:00','2023-03-27 09:14:53'),(93,27,'Graph showing wrong results',NULL,'Done','2','5','Medium','2023-03-27 14:00:00','2023-03-27 12:00:00','2023-03-27 09:14:54'),(94,27,'Efficiency formula','Not able to derive a formula to calculate efficiency.','Stuck','24','5','Hard','2023-03-27 12:00:00','2023-03-26 11:30:00','2023-03-27 11:38:36'),(95,27,'Filter based graph completed','Needed to add filter based graph for better user interaction','Done','192','5','Hard','2023-04-09 23:58:00','2023-04-01 23:58:00','2023-04-09 18:28:59'),(96,27,'Logout not working properly','Logout is very much needed in this app it is important but I am stuck in it here','Stuck','360','5','Hard','2023-04-09 23:58:00','2023-03-25 23:58:00','2023-04-09 18:30:09'),(97,27,'Logout not working properly','Logout is very much needed in this app it is important but I am stuck in it here','Stuck','360','5','Hard','2023-04-09 23:58:00','2023-03-25 23:58:00','2023-04-09 18:30:12'),(98,27,'Authorization completed','User need to be authorized while updating profile','Done','48','5','Medium','2023-04-11 11:45:00','2023-04-09 11:45:00','2023-04-12 06:15:49'),(99,27,'Login session management','Getting some errors while using JWT authentication to manage session','Stuck','264','5','Hard','2023-04-11 11:45:00','2023-03-31 11:45:00','2023-04-12 06:17:17'),(100,27,'Work on Mood tracker','We need to add a functionality in our website to track mood of all employees for each day','Working on it','96','5','Medium','2023-04-21 14:24:00','2023-04-17 14:24:00','2023-04-20 08:54:45'),(101,27,'Error in Reset password','This feature is important','Stuck','48','4','Medium','2023-05-02 10:24:00','2023-04-30 10:24:00','2023-05-02 04:54:44'),(103,27,'Vasas','Validamxjksnx','Stuck','48','3','Easy','2023-05-16 20:48:00','2023-05-14 20:48:00','2023-05-16 20:51:09'),(104,27,'Vas','Validamxjksnx','Stuck','48','3','Easy','2023-05-17 02:18:00','2023-05-15 02:18:00','2023-05-16 20:51:09'),(105,27,'Vas','Validamxjksnx','Stuck','48','3','Easy','2023-05-17 02:18:00','2023-05-15 02:18:00','2023-05-16 20:51:10'),(107,27,'Vakqdone','Validamxjksnx','Stuck','48','3','Easy','2023-05-16 09:48:00','2023-05-14 09:48:00','2023-05-16 20:52:40');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-17 21:53:10
