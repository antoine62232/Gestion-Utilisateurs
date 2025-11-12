// Pages/AdminPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import { 
    Box, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    CircularProgress, 
    Alert 
} from '@mui/material';

const AdminPage = () => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchAllUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // 1. Appel du service pour récupérer la liste
            const response = await UserService.getAllUsers();
            
            // 2. Mise à jour de l'état avec la liste des utilisateurs
            setUserList(response.data); 
        } catch (err) {
            console.error("Erreur lors de la récupération des utilisateurs:", err);

            // Gérer l'erreur 403 (Accès refusé) et rediriger
            if (err.response && err.response.status === 403) {
                setError("Accès refusé. Seuls les administrateurs peuvent voir cette page.");
                // Optionnel : Rediriger l'utilisateur standard vers sa page personnelle
                setTimeout(() => navigate('/user'), 3000); 
            } else {
                setError("Erreur lors du chargement des données. Veuillez réessayer.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Au chargement du composant, lancer la récupération des données
        fetchAllUsers();
    }, []);

    // Affichage des états de chargement/erreur
    if (isLoading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography>Chargement des utilisateurs...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4, maxWidth: 800, margin: '50px auto' }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }
    
    // Affichage du tableau des utilisateurs
    return ( 
        <Box sx={{ p: 4, maxWidth: 1000, margin: '50px auto' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Tableau de Bord Administrateur
            </Typography>

            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: 650 }} aria-label="tableau des utilisateurs">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Prénom</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rôle</TableCell>
                            <TableCell>Créé le</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{user.id}</TableCell>
                                <TableCell>{user.nom}</TableCell>
                                <TableCell>{user.prenom}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                {/* Le nom du rôle est renvoyé sous la propriété 'role' */}
                                <TableCell>{user.role}</TableCell> 
                                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
     );
}
 
export default AdminPage;