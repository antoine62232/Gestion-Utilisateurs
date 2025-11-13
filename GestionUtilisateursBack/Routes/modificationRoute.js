import * as modificationController from '../Controllers/modificationController.js';
import express from 'express';
import { authenticateToken } from '../authMiddleware.js';
const router = express.Router();

// Route pour modifier un utilisateur par son ID
router.put('/users/:id', authenticateToken, modificationController.updateUser);
export default router;