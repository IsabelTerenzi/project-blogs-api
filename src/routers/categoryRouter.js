const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const categoryController = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/', validateJWT, categoryController.controllerPostCategory);
categoryRouter.get('/', validateJWT, categoryController.controllerGetCategories);

module.exports = categoryRouter;