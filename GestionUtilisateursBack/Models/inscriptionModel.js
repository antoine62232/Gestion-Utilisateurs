import connexion from "../config/bdd.js";

// Inscription d'un nouvel utilisateur
export const addUser = async (nom, prenom, email, password, roleId) => {
    // Requête SQL pour insérer un nouvel utilisateur
    const insertUser = `
        INSERT INTO users (nom, prenom, email, password, roleId)
        VALUES (?, ?, ?, ?, ?);
    `;
    // Exécution de la requête d'insertion
    const [result] = await connexion.query(insertUser, [nom, prenom, email, password, roleId]);

    return result;
};



