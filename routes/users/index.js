const express = require('express');
const ROUTE = express.Router();
const authorize = require('../../services/middleware');
const roles = require('../../services/roles');
const userController = require('../../controllers/users')

ROUTE.post('/create-user',authorize(roles.Admin),userController.createUser);
ROUTE.get('/get-user',authorize([roles.PowerUser]),userController.getUser);
ROUTE.get('/get-admin-by-id',userController.getUserById);
ROUTE.post('/change-password/:user',userController.changePassword);
ROUTE.post('/login-user',userController.loginByUser);
ROUTE.post('/login-power-user',userController.loginByAdmin);
ROUTE.post('/login-support',userController.loginByPowerUser);
ROUTE.post('/login-admin',userController.loginBySupport);



module.exports = ROUTE
