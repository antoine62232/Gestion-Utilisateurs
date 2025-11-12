import axios from 'axios';

const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    if (!token) return {};
    
    return {
        headers: {
            // Le format standard est 'Bearer <token>'
            Authorization: `Bearer ${token}` 
        }
    };
};

function getUserById(userId) {
    return axios.get(`http://localhost:3000/api/users/${userId}`, getAuthHeaders())
}

function getAllUsers() {
    return axios.get('http://localhost:3000/api/users', getAuthHeaders())
}

function addUser(newUser) {
    return axios.post('http://localhost:3000/api/register', newUser)
}

function loginUser(credentials) {
    return axios.post('http://localhost:3000/api/login', credentials)
}

function updateUser(userId, updatedInfo) {
    return axios.put(`http://localhost:3000/api/users/${userId}`, updatedInfo, getAuthHeaders())
}

function deleteUser(userId) {
    return axios.delete(`http://localhost:3000/api/users/${userId}`, getAuthHeaders())
}

export default {
    getUserById,
    getAllUsers,
    addUser,
    loginUser,
    updateUser,
    deleteUser
};