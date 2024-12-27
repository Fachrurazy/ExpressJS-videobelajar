const express = require('express');
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/authmiddleware');
const upload = require('../middleware/uploadmiddleware');
const userrouter = express.Router();

userrouter.post('/', UserController.createUser);
userrouter.post('/login', UserController.loginUser);
userrouter.post('/upload', AuthMiddleware.authenticateToken, upload.single('profile'), UserController.uploadProfile);
userrouter.get('/activation', UserController.activateUser);
userrouter.get('/', UserController.getUsers);
userrouter.get('/:id', UserController.getUserById);
userrouter.put('/:id', UserController.updateUser);
userrouter.delete('/:id', UserController.deleteUser);

module.exports = userrouter