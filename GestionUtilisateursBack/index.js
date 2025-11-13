import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connexion from './config/bdd.js';
import inscriptionRoute from './Routes/inscriptionRoute.js';
import connexionRoute from './Routes/connexionRoute.js';
import utilisateursRoute from './Routes/utilisateursRoute.js';
import utilisateurByIdRoute from './Routes/utilisateurByIdRoute.js';
import modificationRoute from './Routes/modificationRoute.js';
import suppressionRoute from './Routes/suppressionRoute.js';
// Création de l'application Express
const app = express();
const PORT = 3000;
// Middleware pour parser le JSON
app.use(express.json());
// Configuration de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Port Vite par défaut
  credentials: true
}));
// Utilisation des routes
app.use('/api', 
  inscriptionRoute,
  connexionRoute,
  utilisateursRoute,
  utilisateurByIdRoute,
  modificationRoute,
  suppressionRoute
);

// utilisation des routes d'inscription

app.get('/', (req, res) => {
  res.send('ça fonctionne !');
});
// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT} 🚀`);
});

export default connexion;