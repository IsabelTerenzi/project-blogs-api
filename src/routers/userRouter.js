const express = require('express');
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');

const { namePasswordValidation, emailValidation } = userValidation;

const userRouter = express.Router();

userRouter.post('/', namePasswordValidation, emailValidation, userController.controllerPostUser);

module.exports = userRouter;