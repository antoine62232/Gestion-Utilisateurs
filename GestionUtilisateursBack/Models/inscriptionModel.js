import connexion from "../config/bdd.js";

// Inscription d'un nouvel utilisateur
export const addUser = async (nom, prenom, email, password, roleId) => {
    const insertUser = `
        INSERT INTO users (nom, prenom, email, password, roleId)
        VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await connexion.query(insertUser, [nom, prenom, email, password, roleId]);

    return result;
};



