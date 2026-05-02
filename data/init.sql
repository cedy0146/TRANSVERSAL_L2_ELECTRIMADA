- ============================================================
-- ElectriMada - Script d'initialisation de la base de donnees
-- ESMIA Innovation - Projet Transversal 2025
-- Version mise a jour pour integration frontend
-- ============================================================

-- 1. Suppression et recreation de la base de donnees
DROP DATABASE IF EXISTS ElectriMadaDB;
CREATE DATABASE IF NOT EXISTS ElectriMadaDB
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ElectriMadaDB;

-- 2. Table Foyer
-- Represente les foyers/familles du village
CREATE TABLE IF NOT EXISTS Foyer (
    id_foyer VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    type_priorite ENUM('Prioritaire', 'Standard', 'Eco') DEFAULT 'Standard',
    consommation_moyenne DOUBLE DEFAULT 0.0,
    jours_sans_electricite INT DEFAULT 0,
    date_creation DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nom (nom),
    INDEX idx_type_priorite (type_priorite)
) ENGINE=InnoDB;

-- 3. Table Batterie
-- Represente la batterie communautaire partagee
CREATE TABLE IF NOT EXISTS Batterie (
    id_batterie INT PRIMARY KEY AUTO_INCREMENT,
    nom_batterie VARCHAR(50) DEFAULT 'Batterie Principale',
    capacite_totale DOUBLE NOT NULL DEFAULT 100.0,
    capacite_actuelle DOUBLE NOT NULL DEFAULT 75.0,
    seuil_critique DOUBLE NOT NULL DEFAULT 20.0,
    tension_volts DOUBLE DEFAULT 220.0,
    etat ENUM('active', 'maintenance', 'hors_service') DEFAULT 'active',
    date_derniere_charge TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Table DemandeEnergie (corrigee pour correspondre au frontend)
-- Les demandes d'electricite des foyers
CREATE TABLE IF NOT EXISTS DemandeEnergie (
    id_demande INT AUTO_INCREMENT PRIMARY KEY,
    id_foyer VARCHAR(50) NOT NULL,
    energie_demandee DOUBLE NOT NULL DEFAULT 0.0,
    date_demande DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    priorite ENUM('high', 'medium', 'low') DEFAULT 'medium',
    statut ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    plage_horaire VARCHAR(20),
    type_appareil VARCHAR(50),
    raison_refus TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_foyer) REFERENCES Foyer(id_foyer) ON DELETE CASCADE,
    INDEX idx_id_foyer (id_foyer),
    INDEX idx_statut (statut),
    INDEX idx_date_demande (date_demande),
    INDEX idx_priorite (priorite)
) ENGINE=InnoDB;

-- 5. Table Rapport
-- Historique des etats de la batterie et consommations
CREATE TABLE IF NOT EXISTS Rapport (
    id_rapport VARCHAR(50) PRIMARY KEY,
    date_rapport DATETIME NOT NULL,
    consommation_totale DOUBLE DEFAULT 0.0,
    production_solaire DOUBLE DEFAULT 0.0,
    batterie_debut DOUBLE NOT NULL,
    batterie_fin DOUBLE NOT NULL,
    nb_demandes_traitees INT DEFAULT 0,
    nb_demandes_refusees INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date_rapport (date_rapport)
) ENGINE=InnoDB;

-- 6. Table SyncQueue
-- File d'attente pour synchronisation offline -> online
CREATE TABLE IF NOT EXISTS SyncQueue (
    id_sync INT AUTO_INCREMENT PRIMARY KEY,
    id_rapport VARCHAR(50),
    type_operation ENUM('INSERT', 'UPDATE', 'DELETE') DEFAULT 'INSERT',
    statut_envoi BOOLEAN DEFAULT FALSE,
    date_tentative TIMESTAMP NULL,
    nb_tentatives INT DEFAULT 0,
    FOREIGN KEY (id_rapport) REFERENCES Rapport(id_rapport) ON DELETE CASCADE,
    INDEX idx_statut_envoi (statut_envoi),
    INDEX idx_id_rapport (id_rapport)
) ENGINE=InnoDB;

-- 7. Table Deltas
-- Variations de consommation entre deux rapports
CREATE TABLE IF NOT EXISTS Deltas (
    id_delta INT AUTO_INCREMENT PRIMARY KEY,
    id_rapport VARCHAR(50),
    type_delta ENUM('Hausse', 'Baisse', 'Stable') DEFAULT 'Stable',
    valeur_delta DOUBLE DEFAULT 0.0,
    FOREIGN KEY (id_rapport) REFERENCES Rapport(id_rapport) ON DELETE CASCADE,
    INDEX idx_id_rapport (id_rapport),
    INDEX idx_type_delta (type_delta)
) ENGINE=InnoDB;

-- 8. Table Utilisateur
-- Comptes pour les responsabilites, delegues et chefs de foyer
CREATE TABLE IF NOT EXISTS Utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    id_foyer VARCHAR(50) DEFAULT NULL,
    nom VARCHAR(100) NOT NULL UNIQUE,
    pin VARCHAR(10) NOT NULL,
    role ENUM('responsable_technique', 'delegate_quartier', 'chef_foyer', 'admin') DEFAULT 'chef_foyer',
    est_actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_foyer) REFERENCES Foyer(id_foyer) ON DELETE SET NULL,
    INDEX idx_nom (nom),
    INDEX idx_role (role)
) ENGINE=InnoDB;

-- 9. Table Alertes
-- Alertes automatiques generees par le systeme
CREATE TABLE IF NOT EXISTS Alertes (
    id_alerte INT AUTO_INCREMENT PRIMARY KEY,
    type_alerte ENUM('Batterie_critique', 'Production_faible', 'Consommation_elevee', 'Batterie_pleine', 'Mode_eco_active') NOT NULL,
    message_alerte TEXT,
    id_rapport VARCHAR(50),
    niveau ENUM('Info', 'Warning', 'Critique') DEFAULT 'Info',
    est_resolue BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rapport) REFERENCES Rapport(id_rapport) ON DELETE CASCADE,
    INDEX idx_type_alerte (type_alerte),
    INDEX idx_niveau (niveau),
    INDEX idx_est_resolue (est_resolue)
) ENGINE=InnoDB;

-- 10. Table TypeAppareil
-- Types d'appareils pour les demandes d'energie
CREATE TABLE IF NOT EXISTS TypeAppareil (
    id_type_appareil INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    nom_mg VARCHAR(50),
    icon VARCHAR(10) DEFAULT '⚡',
    description VARCHAR(255),
    consommation_kwh DOUBLE DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nom (nom)
) ENGINE=InnoDB;

-- 11. Table Prevision
-- Previsions de production solaire
CREATE TABLE IF NOT EXISTS Prevision (
    id_prevision INT AUTO_INCREMENT PRIMARY KEY,
    date_prevision DATE NOT NULL,
    production_estimee DOUBLE NOT NULL,
    production_reelle DOUBLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date_prevision (date_prevision)
) ENGINE=InnoDB;

-- ============================================================
-- DONNEES DE DEMONSTRATION
-- ============================================================

-- Foyers (6 foyers du village)
INSERT INTO Foyer (id_foyer, nom, type_priorite, consommation_moyenne, jours_sans_electricite) VALUES
('F1', 'Hopital Village', 'Prioritaire', 12.0, 0),
('F2', 'Foyer Razafy', 'Standard', 5.5, 1),
('F3', 'Ecole Primaire', 'Prioritaire', 8.0, 0),
('F4', 'Foyer Rakoto', 'Standard', 3.2, 2),
('F5', 'Foyer Andry', 'Eco', 2.1, 0),
('F6', 'Boutique Commerce', 'Standard', 4.0, 1);

-- Batterie communautaire
INSERT INTO Batterie (id_batterie, nom_batterie, capacite_totale, capacite_actuelle, seuil_critique, etat) VALUES
(1, 'Batterie Village', 100.0, 75.0, 20.0, 'active');

-- Demandes d'energie avec les nouveaux champs
INSERT INTO DemandeEnergie (id_foyer, energie_demandee, date_demande, priorite, statut, plage_horaire, type_appareil) VALUES
('F1', 5.0, '2026-04-19 18:00:00', 'high', 'approved', 'soir', 'lumiere'),
('F3', 4.0, '2026-04-19 18:30:00', 'high', 'approved', 'soir', 'radio'),
('F2', 2.5, '2026-04-19 19:00:00', 'medium', 'pending', 'soir', 'lumiere'),
('F4', 1.0, '2026-04-19 19:30:00', 'low', 'pending', 'soir', 'telephone'),
('F1', 3.0, '2026-04-19 20:00:00', 'high', 'approved', 'soir', 'pompe'),
('F5', 1.5, '2026-04-19 20:30:00', 'low', 'pending', 'soir', 'lumiere'),
('F6', 2.0, '2026-04-19 21:00:00', 'medium', 'pending', 'soir', 'television');

-- Rapports historiques
INSERT INTO Rapport (id_rapport, date_rapport, consommation_totale, production_solaire, batterie_debut, batterie_fin, nb_demandes_traitees, nb_demandes_refusees) VALUES
('R1', '2026-04-17 23:59:00', 10.5, 15.0, 98.0, 88.0, 5, 2),
('R2', '2026-04-18 23:59:00', 9.2, 14.5, 88.0, 78.0, 4, 1),
('R3', '2026-04-19 23:59:00', 7.5, 12.0, 78.0, 75.0, 6, 3);

-- Synchronisation
INSERT INTO SyncQueue (id_rapport, type_operation, statut_envoi, nb_tentatives) VALUES
('R1', 'INSERT', TRUE, 1),
('R2', 'INSERT', TRUE, 1),
('R3', 'INSERT', FALSE, 0);

-- Deltas
INSERT INTO Deltas (id_rapport, type_delta, valeur_delta) VALUES
('R1', 'Stable', 0.2),
('R2', 'Baisse', -1.3),
('R3', 'Baisse', -1.7);

-- Alertes
INSERT INTO Alertes (type_alerte, message_alerte, id_rapport, niveau) VALUES
('Batterie_pleine', 'Production solaire optimale', 'R1', 'Info'),
('Consommation_elevee', 'Consommation elevee detectee', 'R2', 'Warning'),
('Batterie_critique', 'Seuil de batterie atteint', 'R3', 'Critique');

-- Types d'appareils
INSERT INTO TypeAppareil (nom, nom_mg, icon, description, consommation_kwh) VALUES
('lumiere', 'jiro', '💡', 'Eclairage', 0.1),
('telephone', 'findrana', '📱', 'Recharge telephone', 0.05),
('pompe_eau', 'ranomasina', '💧', 'Pompe a eau', 0.5),
('commerce', 'varotra', '🏪', 'Commerce / artisanat', 0.3),
('refrigerateur', 'frigorifera', '🧊', 'Refrigerateur', 0.2),
('radio_tv', 'radio', '📻', 'Radio / TV', 0.1);

-- Utilisateurs avec PIN hashe (PIN: "1234" hash SHA256)
-- Pour tester: echo -n "1234" | sha256sum -> 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
INSERT INTO Utilisateur (id_foyer, nom, pin, role) VALUES
('F001', 'admin_hopital', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'admin'),
('F002', 'chef_razafy', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'chef_foyer'),
('F003', 'directeur_ecole', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'chef_foyer'),
('F004', 'chef_rakoto', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'chef_foyer'),
('F005', 'chef_andry', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'chef_foyer'),
('F006', 'boutiquier', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'chef_foyer'),
(NULL, 'responsable_tech', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'responsable_technique'),
(NULL, 'delegue_quartier', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'delegate_quartier');

-- Previsions
INSERT INTO Prevision (date_prevision, production_estimee, production_reelle) VALUES
('2026-04-20', 12.5, NULL),
('2026-04-21', 13.0, NULL),
('2026-04-22', 11.8, NULL),
('2026-04-23', 14.2, NULL),
('2026-04-24', 10.5, NULL);

-- ============================================================
-- Verification des donnees
-- ============================================================
SELECT 'ElectriMadaDB initialisee avec succes!' AS status;

-- Verifier le contenu des tables
SELECT COUNT(*) AS total_foyers FROM Foyer;
SELECT COUNT(*) AS total_demandes FROM DemandeEnergie;
SELECT * FROM Batterie;
