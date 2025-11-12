import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserService from "../Services/UserService";

const ADMIN_ROLE_ID = 1; // ID du rôle Admin défini dans le Back-end

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logique de connexion à implémenter ici
        setMessage("");

        try {
            const response = await UserService.loginUser({ email, password });
            console.log(response.data);
            setMessage("Connexion réussie !");
            const { token, user } = response.data;
            // Stocker le token et les informations utilisateur dans le localStorage
            localStorage.setItem('userToken', token);
            localStorage.setItem('userId', JSON.stringify(user));
            // Stockage du rôle de l'utilisateur
            localStorage.setItem('userRole', user.roleId);
            // 3. REDIRECTION CONDITIONNELLE
            if (user.roleId === ADMIN_ROLE_ID) {
                // Si l'utilisateur est Admin, rediriger vers la page Admin
                navigate('/admin'); 
            } else {
                // Sinon (utilisateur standard), rediriger vers sa page personnelle
                navigate('/user'); 
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage(`Erreur lors de la connexion: ${error.response?.data?.message || error.message}`);
        }
    }

    return (

        <>
<Box 
            sx={{ 
                padding: '20px', 
                maxWidth: '400px', 
                margin: '50px auto', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Page de Connexion
            </Typography>

            {/* Affichage du message de succès ou d'erreur */}
            {message && (
                <Typography 
                    color={message.includes('réussie') ? 'success.main' : 'error.main'} 
                    align="center"
                >
                    {message}
                </Typography>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ 
                    '& .MuiTextField-root': { m: 1, width: 'calc(100% - 16px)' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                noValidate
                autoComplete="off"
            >
                {/* Champ Email */}
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    type="email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    required 
                    fullWidth
                />
                
                {/* Champ Mot de passe */}
                <TextField 
                    label="Mot de passe" 
                    variant="outlined" 
                    type="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    required 
                    fullWidth
                />
                
                {/* Bouton de Soumission */}
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Se connecter
                </Button>
            </Box>
        </Box>
        </>

    );
}

export default LoginPage;