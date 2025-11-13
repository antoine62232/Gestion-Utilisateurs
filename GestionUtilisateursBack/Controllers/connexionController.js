import * as connexionModel from '../Models/connexionModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Clé secrète pour la signature des tokens JWT
const JWT_SECRET = process.env.JWT_SECRET;
// Fonction pour la connexion d'un utilisateur
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await connexionModel.loginUser(email);
        // Vérification de l'existence de l'utilisateur
    if (users.length === 0) {
        return  res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    // Vérification du mot de passe
    const user = users[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    // Génération du token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email, roleId: user.roleId },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    // Exclusion du mot de passe des données utilisateur renvoyées
    const userPublicData = { id: user.id, nom: user.nom, email: user.email, roleId: user.roleId };

    res.status(200).json({ message: 'Connexion réussie', token, user: userPublicData });
    // Gestion des erreurs
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};