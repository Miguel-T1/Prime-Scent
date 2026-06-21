CREATE DATABASE  IF NOT EXISTS `prime_scent` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `prime_scent`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: prime_scent
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `volume` varchar(50) NOT NULL,
  `fragrance_family` varchar(100) NOT NULL,
  `top_notes` varchar(255) DEFAULT NULL,
  `heart_notes` varchar(255) DEFAULT NULL,
  `base_notes` varchar(255) DEFAULT NULL,
  `main_accords` text,
  `weight` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Le Male Eau de Toilette','Jean Paul Gaultier',529.90,'masculino','masculino','125ml','aromático fougère','Lavanda, menta e bergamota','Canela, cominho e flor de laranjeira','Baunilha, fava tonka, sândalo, cedro e âmbar','[{\"name\":\"Aromático\",\"intensity\":100,\"tone\":\"aromatic\"},{\"name\":\"Baunilha\",\"intensity\":88,\"tone\":\"vanilla\"},{\"name\":\"Lavanda\",\"intensity\":82,\"tone\":\"lavender\"},{\"name\":\"Especiado\",\"intensity\":74,\"tone\":\"spicy\"},{\"name\":\"Amadeirado\",\"intensity\":68,\"tone\":\"woody\"}]',0.45,'Perfume masculino clássico da Jean Paul Gaultier, com perfil aromático, fresco e marcante.','./assets/img/products/le-male-edt.webp','2026-06-08 02:05:03'),(2,'Le Male Le Parfum','Jean Paul Gaultier',699.90,'masculino','masculino','125ml','oriental amadeirado','Cardamomo','Lavanda e íris','Baunilha, notas orientais e notas amadeiradas','[{\"name\":\"Especiado quente\",\"intensity\":100,\"tone\":\"spicy\"},{\"name\":\"Baunilha\",\"intensity\":92,\"tone\":\"vanilla\"},{\"name\":\"Lavanda\",\"intensity\":78,\"tone\":\"lavender\"},{\"name\":\"Atalcado\",\"intensity\":72,\"tone\":\"powdery\"},{\"name\":\"Amadeirado\",\"intensity\":65,\"tone\":\"woody\"}]',0.45,'Versão intensa da linha Le Male, com perfil elegante, quente e sofisticado.','./assets/img/products/le-male-le-parfum.webp','2026-06-08 02:05:03'),(4,'Ultra Male','Jean Paul Gaultier',649.90,'masculino','masculino','125ml','oriental doce','Pera, lavanda, menta, bergamota e limão','Canela, sálvia esclareia e alcarávia','Baunilha negra, âmbar, patchouli e cedro','[{\"name\":\"Doce\",\"intensity\":100,\"tone\":\"sweet\"},{\"name\":\"Frutado\",\"intensity\":92,\"tone\":\"fruity\"},{\"name\":\"Baunilha\",\"intensity\":88,\"tone\":\"vanilla\"},{\"name\":\"Aromático\",\"intensity\":76,\"tone\":\"aromatic\"},{\"name\":\"Especiado\",\"intensity\":70,\"tone\":\"spicy\"}]',0.45,'Perfume masculino adocicado, intenso e moderno, conhecido por sua projeção.','./assets/img/products/ultra-male.webp','2026-06-08 02:05:03'),(11,'La Belle Eau de Parfum','Jean Paul Gaultier',649.90,'feminino','feminino','100ml','oriental gourmand','Pera e bergamota','Notas florais e couro','Baunilha, vetiver, âmbar e almíscar','[{\"name\":\"Baunilha\",\"intensity\":100,\"tone\":\"vanilla\"},{\"name\":\"Frutado\",\"intensity\":88,\"tone\":\"fruity\"},{\"name\":\"Doce\",\"intensity\":82,\"tone\":\"sweet\"},{\"name\":\"Ambarado\",\"intensity\":70,\"tone\":\"amber\"},{\"name\":\"Floral\",\"intensity\":62,\"tone\":\"floral\"}]',0.40,'Perfume feminino doce, sensual e sofisticado da linha La Belle.','./assets/img/products/la-belle-edp.webp','2026-06-08 02:05:03'),(13,'Scandal Eau de Parfum','Jean Paul Gaultier',599.90,'feminino','feminino','80ml','chipre floral','Laranja sanguínea e mandarina','Mel, gardênia, flor de laranjeira, jasmim e pêssego','Cera de abelha, caramelo, patchouli e alcaçuz','[{\"name\":\"Mel\",\"intensity\":100,\"tone\":\"honey\"},{\"name\":\"Doce\",\"intensity\":90,\"tone\":\"sweet\"},{\"name\":\"Floral branco\",\"intensity\":78,\"tone\":\"white-floral\"},{\"name\":\"Caramelo\",\"intensity\":70,\"tone\":\"gourmand\"},{\"name\":\"Patchouli\",\"intensity\":62,\"tone\":\"earthy\"}]',0.38,'Perfume feminino marcante, doce e elegante, com forte identidade da linha Scandal.','./assets/img/products/scandal-edp.webp','2026-06-08 02:05:03'),(16,'Gaultier Divine Eau de Parfum','Jean Paul Gaultier',699.90,'feminino','feminino','100ml','floral âmbar','Notas salgadas e brisa marinha','Lírio branco e flores brancas','Merengue cremoso e notas gourmand','[{\"name\":\"Floral branco\",\"intensity\":100,\"tone\":\"white-floral\"},{\"name\":\"Salgado\",\"intensity\":84,\"tone\":\"marine\"},{\"name\":\"Gourmand\",\"intensity\":78,\"tone\":\"gourmand\"},{\"name\":\"Cremoso\",\"intensity\":72,\"tone\":\"creamy\"},{\"name\":\"Marinho\",\"intensity\":66,\"tone\":\"marine\"}]',0.40,'Perfume feminino luminoso, floral e sofisticado da Jean Paul Gaultier.','./assets/img/products/gaultier-divine-edp.webp','2026-06-08 02:05:03'),(17,'Sauvage Eau de Toilette','Dior',649.90,'masculino','masculino','100ml','fresco cítrico amadeirado','Bergamota da Calábria e pimenta','Pimenta Sichuan, lavanda, pimenta rosa, vetiver, patchouli, gerânio e elemi','Ambroxan, cedro e ládano','[{\"name\":\"Fresco especiado\",\"intensity\":100,\"tone\":\"fresh-spicy\"},{\"name\":\"Cítrico\",\"intensity\":88,\"tone\":\"citrus\"},{\"name\":\"Aromático\",\"intensity\":82,\"tone\":\"aromatic\"},{\"name\":\"Amadeirado\",\"intensity\":76,\"tone\":\"woody\"},{\"name\":\"Âmbar\",\"intensity\":66,\"tone\":\"amber\"}]',0.45,'Perfume masculino fresco, cítrico e amadeirado da linha Sauvage.','./assets/img/products/sauvage-edt.webp','2026-06-08 02:05:03'),(20,'Sauvage Elixir','Dior',999.90,'masculino','masculino','60ml','especiado fresco amadeirado','Noz-moscada, canela, cardamomo e toranja','Lavanda','Alcaçuz, sândalo, âmbar, patchouli e vetiver do Haiti','[{\"name\":\"Especiado quente\",\"intensity\":100,\"tone\":\"spicy\"},{\"name\":\"Aromático\",\"intensity\":84,\"tone\":\"aromatic\"},{\"name\":\"Lavanda\",\"intensity\":78,\"tone\":\"lavender\"},{\"name\":\"Amadeirado\",\"intensity\":74,\"tone\":\"woody\"},{\"name\":\"Ambarado\",\"intensity\":66,\"tone\":\"amber\"}]',0.35,'Fragrância masculina de alta intensidade da linha Sauvage.','./assets/img/products/sauvage-elixir.webp','2026-06-08 02:05:03'),(23,'Dior Homme Intense','Dior',849.90,'masculino','masculino','100ml','amadeirado floral almiscarado','Lavanda','Íris, ambreta e pera','Cedro da Virgínia e vetiver','[{\"name\":\"Íris\",\"intensity\":100,\"tone\":\"iris\"},{\"name\":\"Atalcado\",\"intensity\":88,\"tone\":\"powdery\"},{\"name\":\"Amadeirado\",\"intensity\":78,\"tone\":\"woody\"},{\"name\":\"Lavanda\",\"intensity\":70,\"tone\":\"lavender\"},{\"name\":\"Almiscarado\",\"intensity\":62,\"tone\":\"musky\"}]',0.45,'Versão intensa da linha Dior Homme, com perfil sofisticado e marcante.','./assets/img/products/dior-homme-intense.webp','2026-06-08 02:05:03'),(28,'Miss Dior Eau de Parfum','Dior',749.90,'feminino','feminino','100ml','floral','Íris, peônia e lírio-do-vale','Rosa, damasco e pêssego','Baunilha, almíscar, fava tonka, sândalo e benjoim','[{\"name\":\"Floral\",\"intensity\":100,\"tone\":\"floral\"},{\"name\":\"Frutado\",\"intensity\":86,\"tone\":\"fruity\"},{\"name\":\"Atalcado\",\"intensity\":76,\"tone\":\"powdery\"},{\"name\":\"Baunilha\",\"intensity\":70,\"tone\":\"vanilla\"},{\"name\":\"Almiscarado\",\"intensity\":62,\"tone\":\"musky\"}]',0.40,'Perfume feminino floral, elegante e romântico da linha Miss Dior.','./assets/img/products/miss-dior-edp.webp','2026-06-08 02:05:03'),(31,'J adore Eau de Parfum','Dior',799.90,'feminino','feminino','100ml','floral solar','Pera, melão, magnólia, pêssego, mandarina e bergamota','Jasmim, lírio-do-vale, tuberosa, frésia, rosa, orquídea, violeta e ameixa','Almíscar, baunilha, cedro e amora','[{\"name\":\"Floral branco\",\"intensity\":100,\"tone\":\"white-floral\"},{\"name\":\"Floral\",\"intensity\":90,\"tone\":\"floral\"},{\"name\":\"Frutado\",\"intensity\":84,\"tone\":\"fruity\"},{\"name\":\"Doce\",\"intensity\":70,\"tone\":\"sweet\"},{\"name\":\"Almiscarado\",\"intensity\":62,\"tone\":\"musky\"}]',0.40,'Perfume feminino icônico da Dior, com perfil floral luminoso e sofisticado.','./assets/img/products/jadore-edp.webp','2026-06-08 02:05:03'),(35,'Hypnotic Poison Eau de Toilette','Dior',699.90,'feminino','feminino','100ml','oriental baunilhado','Coco, ameixa e damasco','Jacarandá brasileiro, jasmim, tuberosa, alcarávia, rosa e lírio-do-vale','Baunilha, amêndoa, sândalo e almíscar','[{\"name\":\"Baunilha\",\"intensity\":100,\"tone\":\"vanilla\"},{\"name\":\"Amendoado\",\"intensity\":88,\"tone\":\"gourmand\"},{\"name\":\"Doce\",\"intensity\":82,\"tone\":\"sweet\"},{\"name\":\"Cremoso\",\"intensity\":76,\"tone\":\"creamy\"},{\"name\":\"Floral branco\",\"intensity\":66,\"tone\":\"white-floral\"}]',0.40,'Fragrância feminina marcante e envolvente da linha Poison.','./assets/img/products/hypnotic-poison-edt.webp','2026-06-08 02:05:03'),(37,'Pure Poison Eau de Parfum','Dior',749.90,'feminino','feminino','100ml','floral branco','Jasmim, laranja, bergamota e mandarina siciliana','Gardênia e flor de laranjeira','Sândalo, âmbar branco, cedro e almíscar branco','[{\"name\":\"Floral branco\",\"intensity\":100,\"tone\":\"white-floral\"},{\"name\":\"Cítrico\",\"intensity\":82,\"tone\":\"citrus\"},{\"name\":\"Amadeirado\",\"intensity\":72,\"tone\":\"woody\"},{\"name\":\"Almiscarado\",\"intensity\":70,\"tone\":\"musky\"},{\"name\":\"Âmbar branco\",\"intensity\":62,\"tone\":\"amber\"}]',0.40,'Perfume feminino floral, limpo e sofisticado da linha Poison.','./assets/img/products/pure-poison-edp.webp','2026-06-08 02:05:03'),(38,'Acqua di Gio Eau de Toilette','Giorgio Armani',599.90,'masculino','masculino','100ml','aquático aromático','Lima, limão, bergamota, jasmim, laranja, mandarina e neroli','Notas marinhas, jasmim, calone, alecrim, pêssego, frésia, jacinto, ciclâmen, violeta, coentro, rosa, noz-moscada e resedá','Almíscar branco, cedro, musgo de carvalho, patchouli e âmbar','[{\"name\":\"Aquático\",\"intensity\":100,\"tone\":\"marine\"},{\"name\":\"Cítrico\",\"intensity\":88,\"tone\":\"citrus\"},{\"name\":\"Aromático\",\"intensity\":80,\"tone\":\"aromatic\"},{\"name\":\"Fresco\",\"intensity\":76,\"tone\":\"fresh\"},{\"name\":\"Amadeirado\",\"intensity\":64,\"tone\":\"woody\"}]',0.45,'Perfume masculino clássico da Armani, fresco, aquático e versátil.','./assets/img/products/acqua-di-gio-edt.webp','2026-06-08 02:05:03'),(47,'Stronger With You Intensely','Giorgio Armani',699.90,'masculino','masculino','100ml','âmbar amadeirado especiado','Pimenta rosa, zimbro e violeta','Toffee, canela, lavanda e sálvia','Baunilha, âmbar, fava tonka e camurça','[{\"name\":\"Doce\",\"intensity\":100,\"tone\":\"sweet\"},{\"name\":\"Baunilha\",\"intensity\":90,\"tone\":\"vanilla\"},{\"name\":\"Especiado quente\",\"intensity\":82,\"tone\":\"spicy\"},{\"name\":\"Ambarado\",\"intensity\":76,\"tone\":\"amber\"},{\"name\":\"Couro suave\",\"intensity\":62,\"tone\":\"leather\"}]',0.45,'Versão intensa da linha Stronger With You, com perfil quente, doce e marcante.','./assets/img/products/stronger-with-you-intensely.webp','2026-06-08 02:05:03');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-21 18:29:00
