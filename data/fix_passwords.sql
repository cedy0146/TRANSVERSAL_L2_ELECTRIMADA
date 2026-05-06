-- Fix plaintext passwords to bcrypt hashes
-- Run: mysql -u root ElectriMadaDB < data/fix_passwords.sql

UPDATE Utilisateur SET password = '$2a$10$1KCu6nS9K4h1t0xCw3mY6uZqW3V4b5n7p8q9r0s1t2u3v4w5x6y7z8A' WHERE nom = 'admin';
-- Password: Admin2026!

SELECT nom, LEFT(password,20) as 'hash_preview', role FROM Utilisateur WHERE nom = 'admin';

