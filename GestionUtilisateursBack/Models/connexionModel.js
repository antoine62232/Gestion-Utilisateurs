import connexion from "../config/bdd.js";
// Fonction pour la connexion d'un utilisateur
export const loginUser = async (email) => {
    // Requête SQL pour sélectionner l'utilisateur par email
    const selectUser = `
    
        SELECT id, email, password, roleId FROM users
        WHERE email = ?;
    `;
    const [result] = await connexion.query(selectUser, [email]);

    return result;
};

