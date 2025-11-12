// import mysql2 module
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

// creation de la connexion à la base de données
const connexion = mysql.createPool({
    //parametre de connexion
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT

});

// test de la connexion
connexion.getConnection()
// si la connexion est réussie
    .then(() => 
    console.log("database OK 🟢​"))
    // si la connexion échoue
    .catch(error => console.error("database KO 🔴​", error));

// exportation de la connexion
export default connexion;