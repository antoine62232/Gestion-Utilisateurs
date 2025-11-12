import * as suppressionModel from '../Models/suppressionModel.js';

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await suppressionModel.deleteUser(userId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};