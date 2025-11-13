import * as suppressionModel from '../Models/suppressionModel.js';
// Fonction pour la suppression d'un utilisateur
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        // Appel du modèle pour supprimer l'utilisateur
        const result = await suppressionModel.deleteUser(userId);
        // Vérification si l'utilisateur a été supprimé avec succès
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};