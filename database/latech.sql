CREATE DATABASE  IF NOT EXISTS `latech` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `latech`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: latech
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
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `idMarcas` int NOT NULL AUTO_INCREMENT,
  `Marca` varchar(45) NOT NULL,
  PRIMARY KEY (`idMarcas`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Samsung'),(2,'apple'),(3,'motorola'),(4,'iphone'),(5,'xiaomi'),(6,'lg'),(7,'dell'),(8,'asus'),(9,'philips'),(10,'lenovo'),(11,'acer'),(13,'hp'),(14,'intelbras'),(15,'sony'),(16,'toshiba'),(17,'acer'),(18,'canon'),(19,'epson'),(20,'fujitsu'),(21,'positivo'),(22,'panasonic');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `idCategorias` int NOT NULL AUTO_INCREMENT,
  `Categoria` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategorias`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Notebook'),(2,'Desktop'),(3,'Celulares'),(4,'Acessorios');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `idImagens` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(45) NOT NULL,
  `Data_Upload` varchar(45) NOT NULL,
  `Imagem` varchar(100) DEFAULT NULL,
  `Produtos_idProdutos` int NOT NULL,
  `Marcas_idMarcas` int NOT NULL,
  PRIMARY KEY (`idImagens`),
  KEY `fk_Imagens_Produtos1_idx` (`Produtos_idProdutos`),
  KEY `fk_Imagens_Marcas1_idx` (`Marcas_idMarcas`),
  CONSTRAINT `fk_Imagens_Marcas1` FOREIGN KEY (`Marcas_idMarcas`) REFERENCES `brands` (`idMarcas`),
  CONSTRAINT `fk_Imagens_Produtos1` FOREIGN KEY (`Produtos_idProdutos`) REFERENCES `products` (`idProdutos`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'notebook ideapad 3i intel','11/11/2022','/img/pexels-pixabay-159643.jpg',1,8),(2,'notebook dell inspiron','06/12/2022','/img/dell-anniversary-cons-dell-inspiron-3515nt-uhp-2303-02-br-homepage-2up-module-rf-800x400.webp',7,7),(3,'Smartphone Samsung','06/12/2022','/img/tablet.jpg',13,1),(4,'Smarphone Twist','06/12/2022','/img/smartphone.svg',17,21),(5,'Fone de Ouvido Head','06/12/2022','/img/pexels-vlad-bagacian-1337753.jpg',29,9),(6,'Smartphone LG','07/12/2022','/img/pexels-torsten-dettlaff-193004.jpg',23,6),(7,'Fone Panasonic','07/12/2022','/img/pexels-ready-made-3921887.jpg',26,22),(8,'iPhone','07/12/2022','/img/pexels-raka-miftah-4279153.jpg',21,2),(13,'Notebook lenovo','07/12/2022','/img/pexels-nao-triponez-129208.jpg',2,10),(14,'Phone Twist','07/12/2022','/img/pexels-lisa-fotios-1092644.jpg',18,21),(15,'Notebook think','07/12/2022','/img/pexels-karsten-madsen-18105.jpg',11,10),(16,'Phone Redmi','07/12/2022','/img/pexels-josh-sorenson-1334597.jpg',20,5),(17,'iPhone','07/12/2022','/img/pexels-jess-bailey-designs-788946.jpg',22,2),(18,'notebook Intel','07/12/2022','/img/pexels-ann-poan-5797997.jpg',4,11),(19,'notebook dell','07/12/2022','/img/dell-gen-snp-all-monitos-s2721h_cfp_00025lf095_gy-800x620-right-facing-us.webp',8,7),(20,'notebook dell','07/12/2022','/img/dell-anniversary-cons-dell-inspiron-3515nt-uhp-2303-02-br-homepage-2up-module-rf-800x400.webp ',6,8),(21,'Smartphone samsung','07/12/2022','/img/celular.png',12,1),(22,'Bateria','07/12/2022','/img/tablet.jpg',28,5),(23,'Galaxy','07/12/2022','/img/Galaxy1.jpg',14,1),(24,'Galaxy','07/12/2022','/img/Galaxy2.jpg',14,1),(25,'Galaxy','07/12/2022','/img/Galaxy3.jpg',14,1),(26,'Galaxy','07/12/2022','/img/Galaxy4.jpg',14,1),(27,'Galaxy','07/12/2022','/img/Galaxy5.jpg',14,1);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `idProdutos` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Informacao` varchar(1000) DEFAULT NULL,
  `Codigo` varchar(45) DEFAULT NULL,
  `Preco` decimal(10,2) DEFAULT NULL,
  `Oferta` tinyint DEFAULT NULL,
  `Categorias_id` int NOT NULL,
  `Marcas_id` int NOT NULL,
  PRIMARY KEY (`idProdutos`),
  KEY `fk_Produtos_Categorias1_idx` (`Categorias_id`),
  KEY `fk_Produtos_Marcas1_idx` (`Marcas_id`),
  CONSTRAINT `fk_products_brands1` FOREIGN KEY (`Marcas_id`) REFERENCES `brands` (`idMarcas`),
  CONSTRAINT `fk_products_categories1` FOREIGN KEY (`Categorias_id`) REFERENCES `categories` (`idCategorias`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'notebook ideapad 3i intel 128gb tela 15,6\" windows 11','Com o design moderno, possui teclado numérico e processador Intel Core i3-1116G4 para que você tenha ainda mais agilidade nas tarefas do dia a dia, seja para o trabalho ou para o entretenimento.','82MD000ABR',999.00,1,1,8),(2,'notebook np550xda i3-1115g4 4gb intel 2568gb tela 15,6\" windows 11','Softwares Lenovo Vantage, Dolby Audio, Lenovo App Explorer, Lenovo ID Leitor de Cartões 4 em 1 (SD, SDHC, SDXC, MMC), Windows 11, 256 GB SSD','05788-17-04423',1999.00,0,1,10),(3,'notebook intel celeron-6305 4gb 2568gb tela 15,6\" windows 11','Este modelo possui capacidade para a instalação e melhorias de HDD e SSD. Slot ocupado M.2 2280, compatível com SSD PCIe 3.0 NVMe x2/x4 de até 256GB (Não acompanha o produto). Slot livre SATA 3, compatível com HDD ou SSD SATA 3 2.5” de até 1TB','A315-34-C9WH',2999.00,1,1,1),(4,'notebook aspire intel celeron-4020 4gb 128gb tela 15,6\" windows 11 prata','Assistir vídeos, filmes e séries será como estar no cinema com a tela de 15.6” HD (1366 x 768). A tecnologia Acer ComfyView™ otimiza o conforto, refletindo menos luz e garantindo uma visualização mais confortável.','B315-34-C954',1599.00,0,1,11),(5,'notebook ultrafino ideapad 3i 8gb 256gb tela 15,6\" windows 11 prata','Com entrada HDMI 2.0, portas USB 2.0, USB 3.2 e Ethernet (RJ-45), você tem diversas opções para estar sempre conectado recebendo e distribuindo informação.','A3215-34-C875',1599.00,1,1,10),(6,'notebook intel core i5-1035 8gb 256gb ssd linux 15,6\" cinza','Notebook Ultra conta com Windows 11 Home para quem busca mais performance para realizar suas tarefas. O desempenho notável do Notebook Ultra é possível graças ao novo processador Intel Celeron, e o Windows 11 Home. Ideal para tarefas do dia a dia e navegação na internet. Agora com Microsoft 365 Personal.','15-34-C9WH3',4599.00,0,1,8),(7,'notebook intel core i7-1165 8gb 256gb ssd linux 15,6\" preto','Teclado: UP Português-Brasil, 83 teclas + tecla Power + 3 teclas de acesso rápido + tecla Call, Rede sem fio IEEE 802.11 b/g/n™e bluetooth 4.0 LE, Processador Atom Quad Core  ','NP550XDA-KP524',4599.00,1,1,7),(8,'computador 3020 core i5 4 geração 8gb ssd 240gb ','Windows 11. bivolt 100-240v, Memória RAM 4GB, Processador CELERON','NP550XDA-KP3BR',699.00,0,2,7),(9,'pc desktop core i5 2 geração 8gb ssd 120gb ','Modelo: Compaq 8200 Elite. Memória: 8GB. Processador: Intel Core i3 Segunda Geração. Barramento de Memória: DDR3 1066/1333 MHz   ','262633490',699.00,1,2,7),(10,'computador compac intel core  8gb hd 1tb win 10 ','O novo notebook Compaq Presario 420 oferece todo conforto e ergonomia necessários com touchpad e teclas mis largas. Seu acabamento emborrachado e a sua cor cinza fazem dele um produto elegante, além das bordas mais finas, que dão destaque à tela LCD de 14”, Widescreen HD (1366x768) com tecnologia LED.','41990056HG',1499.00,0,2,13),(11,'computador thinkcentreneo 50s displayport i3  8gb 256gb win 11 ','Com o Microsoft Office 365 Personal já integrado, você já conta com aplicativos como Word, Excel, OneNote, PowerPoint e muito mais, e o que é melhor: todas as novas atualizações estão disponíveis para que tenha sempre a versão mais atual.','4199005625',3499.00,1,2,10),(12,'Galaxy A03 64GB 4GB RAM Octa Core 48MP + 2MP 5MP Tela Infinita de 6.5\" Dual Chip Android - Preto','Com 128GB de armazenamento interno, ele é perfeito para guardar todas suas fotos, músicas ou vídeos. Se ainda achar pouco, utilize um cartão MicroSD de até 1TB para expandir essa capacidade! Seu processador é Qualcomm Snapdragon 865 Octa-Core','SM-G781BZBRZTO',3499.00,0,3,1),(13,'Galaxy A03 Core 32GB 4G Wi-Fi Tela 6,5\' Dual Chip 2GB RAM Câmera 8MP + Selfie 5MP','SM-G811BCom 128GB de armazenamento interno, ele é perfeito para guardar todas suas fotos, músicas ou vídeos. Se ainda achar pouco, utilize um cartão MicroSD de até 1TB para expandir essa capacidade! Seu processador é Qualcomm Snapdragon 865 Octa-Core e em conjunto dos 6GB de memória RAM melhoram sua experiência de uso devido a sua combinação poderosa de hardware e software. Sua tela de 6,5\" com resolução FHD+, Super AMOLED entregam um display grande e imersivo ao assistir seus filmes e suas séries favoritas com o máximo de qualidade','SM-G811BZBRZTO',3499.00,1,3,1),(14,'Galaxy S20 FE 5G 128GB 6.5\' DualChip 6GB RAM Câmera Tripla + Selfie 32MP - Azul','Galaxy S20 FE conta com um conjunto de três câmeras na parte de trás, permitindo cliques perfeitos e sem grande esforço, independente do ambiente. A câmera frontal de 32 megapixels oferece tecnologia de nível profissional, para que as selfies tenham o máximo de criatividade. Com 128GB de armazenamento interno, ele é perfeito para guardar todas suas fotos, músicas ou vídeos. Se ainda achar pouco, utilize um cartão MicroSD de até 1TB para expandir. Seu processador é Qualcomm Snapdragon 865 Octa-Core e em conjunto dos 6GB de memória RAM melhoram sua experiência de uso devido a sua combinação de hardware e software','SM-G751BZBRZTO',3499.00,0,3,1),(15,'Moto E20 32GB 4G Wi-Fi Tela 6.5\' Dual Chip 2GB RAM Câmera Dupla + Selfie 5MP - Cinza','Surpreenda-se com o sistema de câmera tripla com senso de 64 mp e tire fotos em alta resolução que captura cenas desde ultra-wide ao ultra-zoom. E conheça a liberdade de fazer o que quiser graças a uma bateria que dura até dois dias. Câmera Traseira:108MP + 16MP + 8MP + ToF ','6411494463',799.00,1,3,3),(16,'Moto G22 128GB 4G Wi-Fi Tela 6.5\' Dual Chip 4GB RAM Câmera Quádrupla + Selfie 16MP - Verde','Com tela Max Vision de 6,5\" HD+, deixará os seus jogos, filmes e videochamadas ainda melhores, graças a tela ultra-wide, com proporção de 20:9. Tudo para você curtir com muito mais facilidade.','2917268922',1299.00,0,3,3),(17,'Twist 4 64GB Dual Chip Android 10 Tela 5.5\" Quad-Core 1,3 GHz 3G 8MP - Vermelho Rubber','Desenvolvido com design moderno, possui o mais novo e atualizado Android, otimizado para trazer maior velocidade nos aplicativos e melhor uso da memória do aparelho. Seu processador é o Octa-Core. Ou seja, muito mais rapidez para você.','973306541',399.00,1,3,21),(18,'Twist 3 Pro S533 Tela 5.7 64GB 1GBRAM Android','Com 64GB de armazenamento, você poderá adicionar fotos, instalar aplicativos, baixar vídeos e muito mais sem se preocupar com a memória. Muito mais espaço!','973306542',999.00,0,3,21),(19,'Smartphone Xiaomi Redmi Note 11 128GB 6GB ram Câmera Tripla + Selfie 16MP Azul','Tem um grande display de 6.43 polegadas com uma resolução de 1080 x 2400 pixel. As funcionalidades oferecidas pelo Redmi Note 11 são muitas e inovadoras. Começando pelo 4G que permite a transferência de dados e excelente navegação na internet. Enfatizamos a excelente memória interna de 128 gb com a possibilidade de expansão','6429113331',2799.00,1,3,5),(20,'Smartphone Redmi Note 11 6.43 Octa Core 128GB 4GB Câmera Quádrupla','O Redmi Note 10 5G é um smartphone Android de bom nível, ótimo para fotos, que pode satisfazer até o mais exigente dos usuários. Tem uma enorme tela Touchscreen de 6.5 polegadas com uma resolução de 2400x1080 pixel. Sobre as características deste Redmi Note 10 5G na verdade não falta nada','5942163022',2799.00,0,3,5),(21,'iPhone 11 Apple (64GB) Branco Tela 6,1\" 4G Câmera 12MP iOS','Tela Super Retina xdr de 6,1 polegadas** com tela Sempre Ativa e ProMotion. Dynamic Island, uma nova forma de interação no iPhone.Câmera grande-angular de 48MP para resolução até 4x maior  ','MQ183BE/A',3599.00,1,3,2),(22,'iPhone 12 Apple 128GB iOS 5G Wi-Fi Tela 6.1\' Câmera 12MP - PRODUCT(RED)','O maior upgrade do sistema de câmera pro até hoje. Tela Super Retina xdr com ProMotion para uma experiência mais rápida e responsiva. Chip A15 Bionic com velocidade impressionante. 5G ultrarrápido*. Design resistente. E um salto imenso na duração da bateria.','MNE43BZ/A',4999.00,0,3,2),(23,'Smartphone Multilaser e, 32GB, 5, Android 8.1, Câmera 5MP, Dourado','Seus filmes, fotos e jogos favoritos ganham vida com a tela HD+ ultra-wide de 6,5. Sua criatividade cresce e aparece no sistema de câmera tripla com foco rápido e inteligência artificial. E para tudo isso, você conta com a potência de um processador eficiente e uma bateria de 5000 mAh que dura muito1.','5116059186',399.00,1,4,6),(24,'Fone de Ouvido Bluetooth 5.0 Sem Fio E6S Display Digital','Capacidade da bateria: 43 mAh por fone de ouvido. Tempo para carga: Aproximadamente 1,5 h. Tempo para uso: Aproximadamente 4 h. Entrada: 5 V --- 100 mAh  ','HSPIAVRCP',399.00,0,4,1),(25,'Bateria Portátil Pineng Carregador Power Bank 10000mah Pn-951 Slim','Tempo para carga: Aproximadamente 2 h Tempo de Carga em espera. Resposta de Frequência: 20Hz - 20kHz. Conexão: Bluetooth 5.0 Perfis   ','A2DPSPIAVR',399.00,1,4,21),(26,'Fone de Ouvido com Redução de Ruído Orelha De Gato Verde','Cabo auxiliar: P2/USB;. Full Hi-fi Stereo. Entrada aux P2 Plug 3,5 mm Stereo (x2)  ','BM-216',399.00,0,4,22),(27,'Bateria Externa Portátil Power Bank Para Celular, Tablet, Caixa de Som, iPhone, Motorola, Samsung An','Seu design elegante e ultra fino garante que você leve-o para qualquer lugar, tornando-se útil e prático!Características:- Tipo de Carregador Power Bank- Agite para começar a carregar;- Duas saídas USB;- Indicador de nível de carga em Leds- Capacidade: 10.000mAh','egh537hh02',399.00,1,4,15),(28,'Carregador Portátil Xiaomi Mi 18W Fast Charge Power Bank 3 Turbo 20000 mAh 2 Saídas USB + Tipo C','Modelo: Parede MHJG3BZ/ACor: BrancoMarca: HrebosEspecificações:Entrada: 100-240V (50/60Hz) | 0.5ASaídas: uma saída USB-C PDSaída: 5V --- 3A | 9V --- 2.22APotência total: 20W (máx)Carregamento rápido e eficienteCom conector metálico para otimizar a passagem de energia','1312114050',399.00,0,4,5),(29,'Fone de ouvido Headphone Philips Bluetooth 15h TAH1205BK/00','Fone de ouvido Bluetooth sem fio, Compatível com Dispositivos Habilitados para Bluetooth. Microfone embutido, a voz Prompt de poder ligar / desligar e emparelhamento, apoiar a discagem por voz para iphone. Versão Bluetooth: 4.1 classe 2. ','A2DPAVRCP',399.00,1,4,9);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_has_purchases`
--

DROP TABLE IF EXISTS `products_has_purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_has_purchases` (
  `Produtos_idProdutos` int NOT NULL,
  `Pedidos_idPedidos` int NOT NULL,
  PRIMARY KEY (`Produtos_idProdutos`,`Pedidos_idPedidos`),
  KEY `fk_Produtos_has_Pedidos_Pedidos1_idx` (`Pedidos_idPedidos`),
  KEY `fk_Produtos_has_Pedidos_Produtos_idx` (`Produtos_idProdutos`),
  CONSTRAINT `fk_Produtos_has_Pedidos_Pedidos1` FOREIGN KEY (`Pedidos_idPedidos`) REFERENCES `purchases` (`idPedidos`),
  CONSTRAINT `fk_Produtos_has_Pedidos_Produtos` FOREIGN KEY (`Produtos_idProdutos`) REFERENCES `products` (`idProdutos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_has_purchases`
--

LOCK TABLES `products_has_purchases` WRITE;
/*!40000 ALTER TABLE `products_has_purchases` DISABLE KEYS */;
INSERT INTO `products_has_purchases` VALUES (1,1);
/*!40000 ALTER TABLE `products_has_purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `idPedidos` int NOT NULL AUTO_INCREMENT,
  `Data_pedido` varchar(45) NOT NULL,
  `Total` decimal(10,2) NOT NULL,
  `Users_IdClientes` int NOT NULL,
  `Users_IdClientes` int NOT NULL,
  `Forma_de_Pagamento` varchar(45) NOT NULL,
  `Endereço_de_Entrega` varchar(100) NOT NULL,
  PRIMARY KEY (`idPedidos`),
  KEY `fk_Purchases_Users1_idx` (`Users_IdClientes`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_Purchases_Users1` FOREIGN KEY (`Users_IdClientes`) REFERENCES `users` (`idClientes`)
  KEY `fk_Purchases_Users1_idx` (`Users_IdClientes`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_Purchases_Users1` FOREIGN KEY (`Users_IdClientes`) REFERENCES `users` (`idClientes`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,'11/11/2020',999.00,1,'Pix','Rua Itapuã, n1, Bairro Itapuã, Salvador, Bahia');
INSERT INTO `purchases` VALUES (1,'11/11/2020',999.00,1,'Pix','Rua Itapuã, n1, Bairro Itapuã, Salvador, Bahia');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idClientes` int NOT NULL AUTO_INCREMENT,
  `idClientes` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(45) NOT NULL,
  `Sobrenome` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Telefone` varchar(45) DEFAULT NULL,
  `Endereco` varchar(45) DEFAULT NULL,
  `Cidade` varchar(45) DEFAULT NULL,
  `Estado` varchar(45) DEFAULT NULL,
  `Senha` varchar(12) NOT NULL,
  `Avatar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idClientes`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ana','Santos Silva','ana@email.com','7198888888','Rua Itapuã, n1, Bairro Itapuã','Salvador','Bahia','123456',NULL),(2,'Lucas','Lima Paz','lucas@email.com','71991919191','Rua do bispo, n4, Bairro Itapuã','Salvador','Bahia','654321',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-06 10:16:46
