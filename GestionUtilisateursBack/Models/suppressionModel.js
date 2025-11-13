import connexion from "../config/bdd.js";
// Fonction pour supprimer un utilisateur
export const deleteUser = async (userId) => {
    // Requête SQL pour supprimer l'utilisateur
    const deleteUser = `
        DELETE FROM users
        WHERE id = ?;
    `;
    const [result] = await connexion.query(deleteUser, [userId]);
    return result;
};