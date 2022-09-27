const express = require('express');
const userController = require('../controllers/userController');
const { namePasswordValidation, emailValidation } = require('../middlewares/userValidation');
const { validateJWT } = require('../auth/validateJWT');

const userRouter = express.Router();

userRouter.post('/', namePasswordValidation, emailValidation, userController.controllerPostUser);
userRouter.get('/', validateJWT, userController.controllerGetUsers);
userRouter.get('/:id', validateJWT, userController.controllerGetUserById);

module.exports = userRouter;