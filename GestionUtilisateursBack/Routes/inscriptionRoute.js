import * as inscriptionController from '../Controllers/inscriptionController.js';
import express from 'express';
const router = express.Router();
// Route pour ajouter un utilisateur
router.post('/register', inscriptionController.addUser);

export default router;