import connexion from "../config/bdd.js";
// Fonction pour modifier les informations d'un utilisateur
export const updateUser = async (userId, nom, prenom, email, roleId) => {
    // Requête SQL pour mettre à jour l'utilisateur
    const updateUser = `
        UPDATE users
        SET nom = ?, prenom = ?, email = ?, roleId = ?
        WHERE id = ?;
    `;
    //² Exécution de la requête de mise à jour
    const [result] = await connexion.query(updateUser, [nom, prenom, email, roleId, userId]);
    return result;
};