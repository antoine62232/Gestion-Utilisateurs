// (Vérification et rappel)

import jwt from 'jsonwebtoken';

// Le secret doit être chargé depuis .env !
const JWT_SECRET = process.env.JWT_SECRET; 

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Vérifie et extrait le token après "Bearer "
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) {
        // 401: Non autorisé (token manquant)
        return res.status(401).json({ message: 'Accès refusé. Authentification requise.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // 403: Interdit (token invalide ou expiré)
            return res.status(403).json({ message: 'Token invalide ou expiré.' });
        }
        
        // Attacher les données décodées (id, email, roleId) à req.user
        req.user = user; 
        
        next(); // Le token est valide, passer au contrôleur
    });
};