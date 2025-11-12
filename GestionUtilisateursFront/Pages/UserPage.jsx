import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import { Box, Typography, TextField, Button, Paper, Alert, Grid } from '@mui/material';

const UserPage = () => {
    // État pour stocker les données de l'utilisateur
    const [userData, setUserData] = useState({ nom: '', prenom: '', email: '', roleId: '', nomRole: '' });
    // État pour la modification
    const [isEditing, setIsEditing] = useState(false); 
    // État pour les messages de statut
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    
    const navigate = useNavigate();

    // 1. Récupération de l'ID de l'utilisateur stocké lors de la connexion
    const storedUser = localStorage.getItem('userId');
    const userId = storedUser ? JSON.parse(storedUser).id : null; 
    
    // Fonction pour charger les données de l'utilisateur
    const fetchUserData = async () => {
        if (!userId) {
            navigate('/login'); // Rediriger si pas d'ID
            return;
        }

        try {
            const response = await UserService.getUserById(userId);
            // Stocker seulement les champs modifiables/affichables
            const { nom, prenom, email, roleId, role } = response.data;
            setUserData({ nom, prenom, email, roleId, nomRole: role });
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
            setStatusMessage({ type: 'error', text: 'Impossible de charger les données.' });
            // Forcer la déconnexion si le token est invalide
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                handleLogout();
            }
        }
    };

    // 2. Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // 3. Gestion de la soumission du formulaire de modification
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Remarque : Le modèle côté Back-end (modificationModel.js)
            // n'a pas de champ pour le mot de passe, ce qui est correct pour cette page.
            await UserService.updateUser(userId, { 
                nom: userData.nom, 
                prenom: userData.prenom, 
                email: userData.email, 
                roleId: userData.roleId 
            });

            setStatusMessage({ type: 'success', text: 'Informations mises à jour avec succès !' });
            setIsEditing(false); // Quitter le mode édition
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            setStatusMessage({ type: 'error', text: error.response?.data?.message || 'Échec de la mise à jour.' });
        }
    };

    // 4. Gestion de la suppression du compte
    const handleDelete = async () => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
            return;
        }

        try {
            await UserService.deleteUser(userId);
            setStatusMessage({ type: 'success', text: 'Compte supprimé. Redirection...' });
            handleLogout(); // Déconnexion après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            setStatusMessage({ type: 'error', text: error.response?.data?.message || 'Échec de la suppression du compte.' });
        }
    };

    // 5. Déconnexion et nettoyage du localStorage
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    // Chargement initial des données
    useEffect(() => {
        fetchUserData();
    }, []); 

    // Affichage
    return (
        <Box sx={{ p: 4, maxWidth: 600, margin: '50px auto' }}>
            <Typography variant="h3" gutterBottom align="center">
                Tableau de Bord Personnel
            </Typography>

            {statusMessage.text && (
                <Alert severity={statusMessage.type} sx={{ mb: 2 }}>
                    {statusMessage.text}
                </Alert>
            )}

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Mes Informations
                </Typography>
                
                <form onSubmit={handleUpdate}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nom"
                                name="nom"
                                value={userData.nom}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Prénom"
                                name="prenom"
                                value={userData.prenom}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleChange}
                                fullWidth
                                disabled={!isEditing}
                            />
                        </Grid>
                        {/* Affichage du rôle (non modifiable ici) */}
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                Rôle: **{userData.nomRole}**
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        {!isEditing ? (
                            <Button 
                                variant="contained" 
                                onClick={() => setIsEditing(true)}
                                color="secondary"
                            >
                                Modifier
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => { setIsEditing(false); fetchUserData(); }} 
                                    color="secondary"
                                >
                                    Annuler
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary"
                                >
                                    Enregistrer
                                </Button>
                            </>
                        )}
                    </Box>
                </form>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={handleDelete}
                    >
                        Supprimer Mon Compte
                    </Button>
                    <Button 
                        variant="text" 
                        onClick={handleLogout}
                        sx={{ ml: 2 }}
                    >
                        Déconnexion
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
 
export default UserPage;