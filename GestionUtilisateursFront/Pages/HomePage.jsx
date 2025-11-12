import { useNavigate } from 'react-router-dom'; // 👈 Importer useNavigate
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HomePage = () => {
    // 1. Initialiser le hook de navigation
    const navigate = useNavigate(); 
    
    // 2. Supprimer tout l'état, useEffect et la fonction fetchUser.
    
    // Fonctions de navigation simples
    const goToSignUp = () => {
        navigate('/register');
    };

    const goToLogin = () => {
        // La route de connexion sera implémentée plus tard, on peut utiliser un placeholder pour l'instant
        navigate('/login'); 
    };

    return (
        <Box 
            sx={{ 
                padding: '40px', 
                maxWidth: '600px', 
                margin: '50px auto', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 3 
            }}
        >
            {/* Titre H1 */}
            <Typography variant="h3" component="h1" gutterBottom>
                Bienvenue sur l'application de gestion des utilisateurs
            </Typography>

            {/* Conteneur pour les boutons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
                
                {/* Bouton S'inscrire */}
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={goToSignUp}
                >
                    S'inscrire
                </Button>

                {/* Bouton Connexion */}
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={goToLogin}
                >
                    Connexion
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;