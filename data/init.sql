-- 1. Création de la base de données
CREATE DATABASE IF NOT EXISTS electrimada CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE electrimada;
-- La table 'communities' est conservée telle quelle pour correspondre aux routes API /api/communities
-- 2. Table des Communautés (Gestion du réseau solaire)
CREATE TABLE IF NOT EXISTS communities (
    id_communaute INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    emplacement VARCHAR(255),
    dailyProduction DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Production prévue en kWh',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
-- 3. Table des Utilisateurs (Authentification et profil) - Renommée et colonnes ajustées pour correspondre au modèle Utilisateur.js
CREATE TABLE IF NOT EXISTS Utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY, -- Correspond à id_utilisateur dans Utilisateur.js
    nom VARCHAR(100) NOT NULL UNIQUE, -- Utilisé pour la connexion dans authController.js
    password VARCHAR(255) NOT NULL, -- Correspond à password dans Utilisateur.js
    role ENUM('admin', 'chef_foyer', 'responsable_technique', 'delegate_quartier') DEFAULT 'chef_foyer', -- Correspond aux rôles dans Utilisateur.js
    id_communaute INT,
    id_foyer INT, -- Ajout de la colonne manquante
    est_actif BOOLEAN DEFAULT TRUE, -- Correspond à est_actif dans Utilisateur.js
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Correspond à created_at dans Utilisateur.js
    FOREIGN KEY (id_communaute) REFERENCES communities(id_communaute) ON DELETE SET NULL,
    FOREIGN KEY (id_foyer) REFERENCES Foyer(id_foyer) ON DELETE SET NULL -- Ajout de la contrainte
) ENGINE=InnoDB;
-- 4. Table des Foyers (Membres de la communauté - liés à la page /dashboard/users) - Renommée pour correspondre au modèle Foyer.js
CREATE TABLE IF NOT EXISTS Foyer (
    id_foyer INT AUTO_INCREMENT PRIMARY KEY,
    nom_responsable VARCHAR(100) NOT NULL,
    type_priorite ENUM('Basse', 'Moyenne', 'Haute', 'Critique') DEFAULT 'Basse',
    conso_estimee DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Consommation journalière en kWh',
    id_communaute INT NOT NULL,
    FOREIGN KEY (id_communaute) REFERENCES communities(id_communaute) ON DELETE CASCADE
) ENGINE=InnoDB;
-- 5. Table des Batteries (État énergétique global) - Renommée pour correspondre au modèle Batterie.js (implicite)
CREATE TABLE IF NOT EXISTS Batterie (
    id_batterie INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    capacite_totale DECIMAL(10,2) NOT NULL COMMENT 'En kWh',
    capacite_actuelle DECIMAL(10,2) NOT NULL COMMENT 'En kWh',
    seuil_critique DECIMAL(10,2) DEFAULT 20.00 COMMENT 'Pourcentage minimum',
    id_communaute INT NOT NULL,
    FOREIGN KEY (id_communaute) REFERENCES communities(id_communaute) ON DELETE CASCADE
) ENGINE=InnoDB;
-- 6. Table des Appareils électriques (Inventaire par foyer) - Renommée et colonne ajoutée pour correspondre au frontend devices/page.tsx
CREATE TABLE IF NOT EXISTS Appareil (
    id_appareil INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    puissance_w INT NOT NULL COMMENT 'Puissance en Watts',
    consommation_kwh DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Consommation horaire en kWh, utilisée par le frontend',
    conso_journaliere DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Consommation journalière calculée',
    id_foyer INT NOT NULL,
    FOREIGN KEY (id_foyer) REFERENCES Foyer(id_foyer) ON DELETE CASCADE
) ENGINE=InnoDB;
-- 7. Table des Demandes d'énergie (Pour l'algorithme du Sac à Dos / Knapsack) - Renommée pour correspondre au modèle DemandeEnergie.js (implicite)
CREATE TABLE IF NOT EXISTS DemandeEnergie (
    id_demande INT AUTO_INCREMENT PRIMARY KEY,
    id_foyer INT NOT NULL, -- Clé étrangère vers Foyer
    id_appareil INT NOT NULL, -- Clé étrangère vers Appareil
    quantite_kwh DECIMAL(10,2) NOT NULL,
    priorite ENUM('Basse', 'Moyenne', 'Haute', 'Critique') NOT NULL,
    statut ENUM('en_attente', 'approuvee', 'rejete') DEFAULT 'en_attente',
    date_demande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_foyer) REFERENCES Foyer(id_foyer) ON DELETE CASCADE,
    FOREIGN KEY (id_appareil) REFERENCES Appareil(id_appareil) ON DELETE CASCADE
) ENGINE=InnoDB;
-- 8. Table des Rapports Historiques (Pour les graphiques du Dashboard) - Renommée et colonnes ajustées pour correspondre à communityController.js
CREATE TABLE IF NOT EXISTS Rapport (
    id_rapport INT AUTO_INCREMENT PRIMARY KEY,
    id_communaute INT NOT NULL,
    jour_semaine VARCHAR(20) NOT NULL COMMENT 'ex: Lun, Mar...', -- Correspond à day dans communityController.js
    consommation_totale DECIMAL(10,2) NOT NULL, -- Correspond à consumption dans communityController.js
    production_solaire DECIMAL(10,2) NOT NULL, -- Correspond à production dans communityController.js
    batterie_debut DECIMAL(10,2) NOT NULL COMMENT 'État batterie en début de journée',
    batterie_fin DECIMAL(10,2) NOT NULL COMMENT 'État batterie en fin de journée', -- Correspond à batteryEnd dans communityController.js
    nb_demandes_traitees INT DEFAULT 0, -- Correspond à demandesTraitees dans communityController.js
    nb_demandes_refusees INT DEFAULT 0,
    date_rapport DATE NOT NULL, -- Correspond à timestamp dans communityController.js
    FOREIGN KEY (id_communaute) REFERENCES communities(id_communaute) ON DELETE CASCADE
) ENGINE=InnoDB;
-- ==========================================================
-- INSERTION DE DONNÉES INITIALES (Pour tester le Dashboard)
-- ==========================================================

-- Insertion d'une communauté par défaut
INSERT INTO communities (id_communaute, nom, emplacement, dailyProduction) 
VALUES (1, 'Ambohitrimo Solaire', 'Antananarivo', 550.00);

-- Insertion de l'utilisateur admin (Note: Le mot de passe devra être géré par bcrypt dans Node.js)
INSERT INTO Utilisateur (nom, password, role, id_communaute, est_actif) 
VALUES ('admin', 'Admin2026!', 'admin', 1, TRUE); -- Mot de passe en clair pour le moment, à hacher avec bcrypt

-- Insertion de quelques foyers membres
INSERT INTO Foyer (nom_responsable, type_priorite, conso_estimee, id_communaute) VALUES 
('Rakoto Jean', 'Haute', 15.50, 1),
('Rabe Marie', 'Basse', 6.20, 1),
('Rasoa Perle', 'Moyenne', 10.70, 1);

-- État de la batterie
INSERT INTO Batterie (nom, capacite_totale, capacite_actuelle, seuil_critique, id_communaute) 
VALUES ('Pack Tesla Wall A', 1000.00, 750.00, 20.00, 1);

-- Historique pour le graphique Recharts (7 derniers jours) - Renommée et colonnes ajustées
INSERT INTO Rapport (id_communaute, jour_semaine, consommation_totale, production_solaire, batterie_debut, batterie_fin, nb_demandes_traitees, nb_demandes_refusees, date_rapport) VALUES
(1, 'Lun', 120.00, 150.00, 800.00, 750.00, 10, 2, CURDATE() - INTERVAL 6 DAY),
(1, 'Mar', 140.00, 130.00, 750.00, 700.00, 12, 3, CURDATE() - INTERVAL 5 DAY),
(1, 'Mer', 110.00, 160.00, 700.00, 900.00, 8, 1, CURDATE() - INTERVAL 4 DAY),
(1, 'Jeu', 150.00, 140.00, 900.00, 650.00, 15, 5, CURDATE() - INTERVAL 3 DAY),
(1, 'Ven', 130.00, 155.00, 650.00, 800.00, 11, 2, CURDATE() - INTERVAL 2 DAY),
(1, 'Sam', 160.00, 120.00, 800.00, 500.00, 20, 7, CURDATE() - INTERVAL 1 DAY),
(1, 'Dim', 90.00, 180.00, 500.00, 950.00, 5, 0, CURDATE());
