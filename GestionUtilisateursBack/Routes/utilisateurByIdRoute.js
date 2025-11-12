import * as utilisateurByIdController from '../Controllers/utilisateurByIdController.js';
import express from 'express';
const router = express.Router();

// Route pour récupérer un utilisateur par son ID
router.get('/users/:id', utilisateurByIdController.getUserById);

export default router;
