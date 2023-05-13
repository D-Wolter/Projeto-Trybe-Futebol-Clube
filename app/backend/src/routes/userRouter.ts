import express = require('express');
import validateToken from '../middlewares/validateToken';
import validationUser from '../middlewares/validateUser';
import LoginController from '../controllers/userController';
import LoginService from '../services/userService';
import Users from '../database/models/UserModel';

const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);

const loginRoutes = express.Router();

loginRoutes.post('/', validationUser, loginController.login);
loginRoutes.get('/role', validateToken, loginController.getRole);

export default loginRoutes;
