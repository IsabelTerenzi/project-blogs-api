const express = require('express');
const loginController = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/', loginController.controllerPostLogin);

module.exports = loginRouter;