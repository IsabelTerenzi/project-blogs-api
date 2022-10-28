const express = require('express');
const postController = require('../controllers/postsController');
const { validateJWT } = require('../auth/validateJWT');
const { authorizedUser } = require('../middlewares/userValidation');

const postRouter = express.Router();

postRouter.get('/', validateJWT, postController.controllerGetPosts);
postRouter.get('/search', validateJWT, postController.controllerSearchPost);
postRouter.get('/:id', validateJWT, postController.controllerGetPostById);
postRouter.post('/', validateJWT, postController.controllerCreatePost);
postRouter.put('/:id', validateJWT, authorizedUser, postController.controllerUpdatePost);
postRouter.delete('/:id', validateJWT, authorizedUser, postController.controllerDeletePost);

module.exports = postRouter;