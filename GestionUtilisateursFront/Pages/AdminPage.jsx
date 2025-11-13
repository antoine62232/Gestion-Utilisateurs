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
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';



const AdminPage = () => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUserToEdit, setCurrentUserToEdit] = useState(null);

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

    const handleOpenModal = (user) => {
        setCurrentUserToEdit(user);
        setIsModalOpen(true);
    };

    const handleChangeModal = (e) => {
        const { name, value } = e.target;
        setCurrentUserToEdit((prevUser) => ({
            ...prevUser,
            // Convertir le rôle en nombre, car le Back-end l'attend comme INT
            [name]: name === 'roleId' ? parseInt(value) : value
        }));
    };

    const handleUpdateSubmit = async () => {
        // S'assurer qu'un utilisateur est sélectionné
        if (!currentUserToEdit || ! currentUserToEdit.id) {
            setError("Aucun utilisateur sélectionné pour la mise à jour.");
            return;
        }
        try {
            await UserService.updateUser(currentUserToEdit.id, {
                nom: currentUserToEdit.nom,
                prenom: currentUserToEdit.prenom,
                email: currentUserToEdit.email,
                roleId: currentUserToEdit.roleId,
            });
            setIsModalOpen(false);
            // Affiche un message de succès (réinitialiser l'erreur)
            setError({ type: 'success', text: `Utilisateur ${currentUserToEdit.nom} mis à jour !` });
            fetchAllUsers(); // Rafraîchir la liste
        } catch (err) {
            console.error("Erreur lors de la mise à jour:", err);
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
        if (!confirmDelete) return;
        try {
            await UserService.deleteUser(userId);
            // Affiche un message de succès (réinitialiser l'erreur)
            setError({ type: 'success', text: `Utilisateur supprimé !` });
            fetchAllUsers(); // Rafraîchir la liste
        } catch (err) {
            console.error("Erreur lors de la suppression:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        navigate('/login');
    };

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
        <Box sx={{ p: 4, maxWidth: 1000, margin: '40px auto' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Tableau de Bord Administrateur
            </Typography>

            <TableContainer component={Paper} elevation={5}>
                <Table sx={{ minWidth: 650}} aria-label="tableau des utilisateurs">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>Nom</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>Prénom</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Rôle</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Créé le</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Modifier</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Supprimer</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user, index) => (
                            <TableRow
                                key={user.id}
                                // 👈 STYLE ALTERNÉ (rayures)
                                sx={{
                                    backgroundColor: index % 2 === 0 ? 'action.hover' : 'white',
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >
                                <TableCell component="th" scope="row">{user.id}</TableCell>
                                <TableCell>{user.nom}</TableCell>
                                <TableCell>{user.prenom}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                {/* Appliquer un badge ou une couleur au rôle */}
                                <TableCell align="center">
                                    <Box
                                        component="span"
                                        sx={{
                                            px: 1.5, py: 0.5, borderRadius: '5px',
                                            // ✅ CORRECTION : Vérifie si le rôle (en minuscules) contient la chaîne 'admin'
                                            backgroundColor: user.role && user.role.toLowerCase().includes('admin') ? 'error.light' : 'success.light',
                                            color: 'black',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {user.role}
                                    </Box>
                                </TableCell>
                                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                <TableCell align='center'>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => handleOpenModal(user)}
                                    >
                                        <EditOutlinedIcon />
                                    </Button>
                                </TableCell>
                                <TableCell align='center'>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <DeleteForeverOutlinedIcon />
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Modal d'édition utilisateur */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Modifier l'utilisateur : {currentUserToEdit ? currentUserToEdit.nom : ''}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        {/* Champs de formulaire pour modifier l'utilisateur */}
                        <TextField
                            margin="dense"
                            label="Nom"
                            name="nom"
                            fullWidth
                            variant="outlined"
                            value={currentUserToEdit ? currentUserToEdit.nom : ''}
                            onChange={handleChangeModal}
                            />
                        <TextField
                            margin="dense"
                            label="Prénom"
                            name="prenom"
                            fullWidth
                            variant="outlined"
                            value={currentUserToEdit ? currentUserToEdit.prenom : ''}
                            onChange={handleChangeModal}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={currentUserToEdit ? currentUserToEdit.email : ''}
                            onChange={handleChangeModal}
                        />
                        <TextField
                            margin="dense"
                            label="Rôle (1: Admin, 2: User, 3: Moderator)"
                            name="roleId"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={currentUserToEdit ? currentUserToEdit.roleId : ''}
                            onChange={handleChangeModal}
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)} color="secondary">
                        Annuler
                    </Button>
                    <Button onClick={handleUpdateSubmit} color="primary" variant='contained'>
                        Sauvegarder
                    </Button>
                </DialogActions>

            </Dialog>
            <Button 
                        variant="contained"
                        
                        onClick={handleLogout}
                        sx={{ display: 'block', margin: '30px auto 0 auto' }}
                        
                    >
                        Déconnexion
                    </Button>
        </Box>
        
    );
}

export default AdminPage;