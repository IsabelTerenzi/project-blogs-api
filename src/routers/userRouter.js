const express = require('express');
const userController = require('../controllers/userController');
const { namePasswordValidation, emailValidation } = require('../middlewares/userValidation');

const userRouter = express.Router();

userRouter.post('/', namePasswordValidation, emailValidation, userController.controllerPostUser);

module.exports = userRouter;