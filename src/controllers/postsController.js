const postService = require('../services/postService');

const serviceGetPosts = async (req, res, next) => {
    try {
        const getPosts = await postService.serviceGetPosts();
        res.status(200).json(getPosts);
    } catch (error) {
        next(error);
    }
};

module.exports = { serviceGetPosts };