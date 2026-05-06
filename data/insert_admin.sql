-- Insert demo admin user for login testing
-- Password: Admin2026! (plaintext)

INSERT INTO Utilisateur (nom, role, password, id_foyer, est_actif) 
VALUES ('admin', 'admin', 'Admin2026!', NULL, TRUE)
ON DUPLICATE KEY UPDATE password = 'Admin2026!';

-- Verify:
-- SELECT nom, role FROM Utilisateur WHERE nom = 'admin';

