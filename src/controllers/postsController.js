const postService = require('../services/postService');

const controllerGetPosts = async (req, res, next) => {
    try {
        const getPosts = await postService.serviceGetPosts();
        res.status(200).json(getPosts);
    } catch (error) {
        next(error);
    }
};

const controllerGetPostById = async (req, res, next) => {
 try {
    const { id } = req.params;
     const getPost = await postService.serviceGetPostById(id);

     if (!getPost) {
        return res.status(404).json({ message: 'Post does not exist' });
    }

    res.status(200).json(getPost);
 } catch (error) {
    next(error);
 }
};

module.exports = { controllerGetPosts, controllerGetPostById };