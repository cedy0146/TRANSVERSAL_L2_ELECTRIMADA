-- Migration : Table communities pour ÉlectriMada
-- Exécuter : mysql -u root -p electr imada_db < create_communities_table.sql

CREATE TABLE IF NOT EXISTS `communities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `members` int(11) DEFAULT 0,
  `production` decimal(10,2) DEFAULT 0.00,
  `efficiency` decimal(5,2) DEFAULT 0.00,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Données d'exemple
INSERT INTO `communities` (`name`, `location`, `members`, `production`, `efficiency`) VALUES
('Village ElectriMada 1', 'Antananarivo', 45, 4.5, 95.50),
('Village ElectriMada 2', 'Fianarantsoa', 32, 3.2, 92.30),
('Village ElectriMada 3', 'Toliara', 28, 2.8, 88.10),
('Village ElectriMada 4', 'Antsirabe', 38, 3.8, 93.80);
