import * as modificationModel from '../Models/modificationModel.js';
// Fonction pour la modification des informations d'un utilisateur
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { nom, prenom, email, roleId } = req.body;
    // Appel du modèle pour mettre à jour l'utilisateur
    try {
        const result = await modificationModel.updateUser(userId, nom, prenom, email, roleId);
        // Vérification si l'utilisateur a été mis à jour avec succès
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};