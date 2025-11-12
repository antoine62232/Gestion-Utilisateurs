import * as modificationController from '../Controllers/modificationController.js';
import express from 'express';
const router = express.Router();

// Route pour modifier un utilisateur par son ID
router.put('/users/:id', modificationController.updateUser);
export default router;