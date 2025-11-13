import * as connexionController from '../Controllers/connexionController.js';
import express from 'express';
const router = express.Router();

// Route pour la connexion d'un utilisateur
router.post('/login', connexionController.loginUser);

export default router;