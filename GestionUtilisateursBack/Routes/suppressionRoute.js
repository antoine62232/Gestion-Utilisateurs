import * as suppressionController from '../Controllers/suppressionController.js';
import express from 'express';
import { authenticateToken } from '../authMiddleware.js';
const router = express.Router();
// Route pour supprimer un utilisateur par son ID
router.delete('/users/:id', authenticateToken, suppressionController.deleteUser);
export default router;
