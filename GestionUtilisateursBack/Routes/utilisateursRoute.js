import * as utilisateursController from "../Controllers/utilisateursController.js";
import express from "express";
import { authenticateToken } from "../authMiddleware.js";
const router = express.Router();
// Route pour récupérer tous les utilisateurs

router.get('/users', authenticateToken, utilisateursController.getAllUsers);

export default router;