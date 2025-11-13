import * as utilisateursModel from "../Models/utilisateursModel.js";
// Fonction pour récupérer tous les utilisateurs
const ADMIN_ROLE_ID = 1;
// Seuls les administrateurs peuvent accéder à cette fonctionnalité
export const getAllUsers = async (req, res) => {
// Vérification des privilèges administrateur
    const userRoleId = req.user ? req.user.roleId : null;
// Si l'utilisateur n'est pas administrateur, renvoyer une erreur 403
    if (userRoleId !== ADMIN_ROLE_ID) {
        return res.status(403).json({ message: 'Accès refusé : privilèges administrateur requis' });
    }

    try {
        // Appel du modèle pour récupérer tous les utilisateurs
        const users = await utilisateursModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};