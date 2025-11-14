import * as utilisateurByIdController from '../Controllers/utilisateurByIdController.js';
import express from 'express';
import { authenticateToken } from '../authMiddleware.js';
const router = express.Router();

// Route pour récupérer un utilisateur par son ID
router.get('/users/:id', authenticateToken, utilisateurByIdController.getUserById);

export default router;
