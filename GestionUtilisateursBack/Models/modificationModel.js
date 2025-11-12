import connexion from "../config/bdd.js";

export const updateUser = async (userId, nom, prenom, email, roleId) => {
    const updateUser = `
        UPDATE users
        SET nom = ?, prenom = ?, email = ?, roleId = ?
        WHERE id = ?;
    `;
    const [result] = await connexion.query(updateUser, [nom, prenom, email, roleId, userId]);
    return result;
};