-- ElectriMada - Schema complet & data demo
-- Compatible models, no errors, password bcrypt

DROP DATABASE IF EXISTS ElectriMadaDB;
CREATE DATABASE ElectriMadaDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ElectriMadaDB;

-- Foyer (match Foyer.js)
CREATE TABLE Foyer (
  id_foyer VARCHAR(50) PRIMARY KEY,
  nom VARCHAR(100),
  type_priorite VARCHAR(20),
  consommation_moyenne DOUBLE,
  jours_sans_electricite INT DEFAULT 0
);

-- Batterie (match Batterie.js - no nom_batterie)
CREATE TABLE Batterie (
  id_batterie INT PRIMARY KEY AUTO_INCREMENT,
  capacite_totale DOUBLE,
  capacite_actuelle DOUBLE,
  seuil_critique DOUBLE DEFAULT 20
);

-- Utilisateur (password VARCHAR bcrypt)
CREATE TABLE Utilisateur (
  id_utilisateur INT PRIMARY KEY AUTO_INCREMENT,
  id_foyer VARCHAR(50),
  nom VARCHAR(100) UNIQUE,
  password VARCHAR(255),  -- bcrypt hash
  role VARCHAR(30) DEFAULT 'chef_foyer',
  est_actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TypeAppareil (match model - no nom_mg)
CREATE TABLE TypeAppareil (
  id_type_appareil INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(50),
  icon VARCHAR(10),
  description VARCHAR(255),
  consommation_kwh DOUBLE
);

-- DemandeEnergie
CREATE TABLE DemandeEnergie (
  id_demande INT PRIMARY KEY AUTO_INCREMENT,
  id_foyer VARCHAR(50),
  energie_demandee DOUBLE,
  priorite VARCHAR(10),
  statut VARCHAR(10) DEFAULT 'pending'
);

-- Alerte (no FK id_rapport to avoid constraint)
CREATE TABLE Alerte (
  id_alerte INT PRIMARY KEY AUTO_INCREMENT,
  type_alerte VARCHAR(50),
  message_alerte TEXT,
  niveau VARCHAR(10)
);

-- Rapport (no production_solaire)
CREATE TABLE Rapport (
  id_rapport VARCHAR(50) PRIMARY KEY,
  date_rapport DATETIME,
  consommation_totale DOUBLE,
  batterie_debut DOUBLE,
  batterie_fin DOUBLE
);

-- Data demo
INSERT INTO Foyer VALUES
('1', 'Hopital', 'Prioritaire', 12.0, 0),
('2', 'Ecole', 'Prioritaire', 8.0, 0),
('3', 'Razafy', 'Standard', 5.5, 1);

INSERT INTO Batterie VALUES
(1, 100.0, 75.0, 20.0);

-- SHA256("secret123!") = 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
INSERT INTO Utilisateur (nom, role, password) VALUES
('admin', 'admin', 'admin'),
('medecin', 'chef_foyer', 'medecin');

INSERT INTO TypeAppareil VALUES
(NULL, 'Lumiere', '💡', 'Eclairage', 0.1),
(NULL, 'Telephone', '📱', 'Recharge', 0.05);

INSERT INTO DemandeEnergie VALUES
(NULL, 'F001', 5.0, 'high', 'pending');

INSERT INTO Alerte VALUES
(NULL, 'Batterie OK', 'Niveau 75%', 'Info');

INSERT INTO Rapport VALUES
('1', NOW(), 10.5, 80.0, 75.0);

SELECT 'DB prête 0 erreurs!';
