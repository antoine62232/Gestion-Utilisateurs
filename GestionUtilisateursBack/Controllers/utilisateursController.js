import * as utilisateursModel from "../Models/utilisateursModel.js";

const ADMIN_ROLE_ID = 1;

export const getAllUsers = async (req, res) => {

    const userRoleId = req.user ? req.user.roleId : null;

    if (userRoleId !== ADMIN_ROLE_ID) {
        return res.status(403).json({ message: 'Accès refusé : privilèges administrateur requis' });
    }

    try {
        const users = await utilisateursModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};