import * as suppressionController from '../Controllers/suppressionController.js';
import express from 'express';
const router = express.Router();
// Route pour supprimer un utilisateur par son ID
router.delete('/users/:id', suppressionController.deleteUser);
export default router;
