import connexion from "../config/bdd.js";

export const deleteUser = async (userId) => {
    const deleteUser = `
        DELETE FROM users
        WHERE id = ?;
    `;
    const [result] = await connexion.query(deleteUser, [userId]);
    return result;
};