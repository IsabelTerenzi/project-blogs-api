const express = require('express');
const postController = require('../controllers/postsController');
const validateJWT = require('../auth/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateJWT, postController.controllerGetPosts);
postRouter.get('/:id', validateJWT, postController.controllerGetPostById);

module.exports = postRouter;