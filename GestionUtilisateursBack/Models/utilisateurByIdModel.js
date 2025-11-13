import connexion from "../config/bdd.js";
// Fonction pour récupérer un utilisateur par son ID
export const getUserById = async (userId) => {
    const selectUserById = `
        SELECT users.id, users.nom, users.prenom, users.email, users.roleId, roles.nomRole AS role, users.created_at
        FROM users
        INNER JOIN roles ON users.roleId = roles.idRole
        WHERE users.id = ?;
    `;
    const [result] = await connexion.query(selectUserById, [userId]);
    return result;
}