import { useEffect, useState } from "react";
import UserService from "../Services/UserService";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SignUpPage = () => {
    const [newUser, setNewUser] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        roleId: 2
    });

const [message, setMessage] = useState("");

const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }));
}

    const fetchNewUser = async () => {
        try {
            const response = await UserService.addUser({
                nom: newUser.nom,
                prenom: newUser.prenom,
                email: newUser.email,
                password: newUser.password,
                roleId: newUser.roleId
            });
            console.log(response.data);
            setMessage("Inscription réussie !");
            setNewUser({nom: "", prenom: "", email: "", password: "", roleId: 2});
        } catch (error) {
            console.error("Error adding new user:", error);
            setMessage(`Erreur lors de l'inscription: ${error.response?.data?.message || error.message}`);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNewUser();
    };


    return ( 
        <>
        <Box 
            component="div"
            sx={{ 
                padding: '20px', 
                maxWidth: '400px', 
                margin: '20px auto', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2 // Espacement vertical entre les éléments
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Page d'inscription
            </Typography>

            {message && (
                <Typography 
                    color={message.includes('succès') ? 'success.main' : 'error.main'} 
                    align="center"
                >
                    {message}
                </Typography>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ 
                    '& .MuiTextField-root': { m: 1, width: 'calc(100% - 16px)' }, // Style pour les TextField
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                noValidate
                autoComplete="off"
            >
                {/* Champ Nom */}
                <TextField 
                    label="Nom" 
                    variant="outlined" 
                    name="nom" 
                    value={newUser.nom} 
                    onChange={handleChange} 
                    required 
                    fullWidth // Prend toute la largeur disponible dans le conteneur
                />
                
                {/* Champ Prénom */}
                <TextField 
                    label="Prénom" 
                    variant="outlined" 
                    name="prenom" 
                    value={newUser.prenom} 
                    onChange={handleChange} 
                    required 
                    fullWidth
                />
                
                {/* Champ Email */}
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    type="email" 
                    name="email" 
                    value={newUser.email} 
                    onChange={handleChange} 
                    required 
                    fullWidth
                />
                
                {/* Champ Mot de passe */}
                <TextField 
                    label="Mot de passe" 
                    variant="outlined" 
                    type="password" 
                    name="password" 
                    value={newUser.password} 
                    onChange={handleChange} 
                    required 
                    fullWidth
                />
                
                {/* Bouton de Soumission MUI */}
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }} // Marge top
                    fullWidth
                >
                    S'inscrire
                </Button>
            </Box>
        </Box>
        </>
     );
}
 
export default SignUpPage;