const express = require('express');
const postController = require('../controllers/postsController');
const validateJWT = require('../auth/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateJWT, postController.serviceGetPosts);

module.exports = postRouter;