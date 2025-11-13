import connexion from "../config/bdd.js";
// Fonction pour récupérer tous les utilisateurs
export const getAllUsers = async () => {
    const selectUsers = `
        SELECT users.id, users.nom, users.prenom, users.email, roles.nomRole AS role, users.created_at
        FROM users
        INNER JOIN roles ON users.roleId = roles.idRole;
    `;
    const [result] = await connexion.query(selectUsers);
    return result;
};