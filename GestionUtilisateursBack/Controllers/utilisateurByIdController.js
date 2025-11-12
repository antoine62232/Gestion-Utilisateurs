import * as utilisateurByIdModel from '../Models/utilisateurByIdModel.js';

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await utilisateurByIdModel.getUserById(userId);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};