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

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Port Vite par défaut
  credentials: true
}));

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

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT} 🚀`);
});

export default connexion;