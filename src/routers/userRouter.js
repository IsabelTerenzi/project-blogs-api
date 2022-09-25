const express = require('express');
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');

const userRouter = express.Router();

userRouter.post('/', userValidation, userController.controllerPostUser);

module.exports = userRouter;