import * as inscriptionModel from '../Models/inscriptionModel.js';
import bcrypt from 'bcryptjs';
// Importation de bcrypt pour le hachage des mots de passe
const saltRounds = 10; // Nombre de rounds pour le salage

export const addUser = async (req, res) => {
    const { nom, prenom, email, password, roleId } = req.body;

    try {
        // Hachage du mot de passe avant de le stocker dans la base de données
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Appel du modèle pour ajouter l'utilisateur
        const user = await inscriptionModel.addUser(nom, prenom, email, hashedPassword, roleId);
        // Vérification si l'utilisateur a été ajouté avec succès
        if (user.affectedRows === 0) {
            return res.status(409).json({ message: "L'utilisateur existe déjà ou erreur de BDD" });
        }
        res.status(201).json({ message: "Utilisateur créé avec succès", userId: user.insertId });
        // Gestion des erreurs
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "L'utilisateur existe déjà" });
        }
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
