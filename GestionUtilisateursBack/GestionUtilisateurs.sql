-- Création de la base
CREATE DATABASE usersManagement;
USE usersManagement;


-- Table des utilisateurs
CREATE TABLE users (
    -> id INT AUTO_INCREMENT PRIMARY KEY,
    -> nom VARCHAR(50) NOT NULL,
    -> prenom VARCHAR(50) NOT NULL,
    -> email VARCHAR(100) UNIQUE NOT NULL,
    -> password VARCHAR(255) NOT NULL,
    -> roleId INT NOT NULL,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -> );

-- Table des rôles
 CREATE TABLE roles (
    -> idRole INT AUTO_INCREMENT PRIMARY KEY,
    -> nomRole VARCHAR(50) NOT NULL,
    -> description TEXT NOT NULL,
    -> create_atRole TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> updated_atRole DATETIME
    -> );

-- Ajout contrainte
ALTER TABLE users ADD CONSTRAINT fkRole FOREIGN KEY (roleId) REFERENCES roles(idRole) ON DELETE CASCADE ON UPDATE CASCADE;