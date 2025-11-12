import connexion from "../config/bdd.js";

export const loginUser = async (email) => {
    const selectUser = `
        SELECT id, email, password, roleId FROM users
        WHERE email = ?;
    `;
    const [result] = await connexion.query(selectUser, [email]);

    return result;
};

