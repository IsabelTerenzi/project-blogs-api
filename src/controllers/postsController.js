const postService = require('../services/postService');
const { User, BlogPost } = require('../models');

const controllerGetPosts = async (req, res, next) => {
    try {
        const getPosts = await postService.serviceGetPosts();
        res.status(200).json(getPosts);
    } catch (error) {
        next(error);
    }
};

const controllerSearchPost = async (req, res, next) => {
    try {
        const { q } = req.query;

        if (!q) {
            const getPosts = await postService.serviceGetPosts();
            return res.status(200).json(getPosts);
        }

        const findPost = await postService.serviceSearchPost(q);

        if (!findPost) {
            return res.status(200).json([]);
        }

        res.status(200).json(findPost);
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

/* const controllerCreatePost = async (req, res, next) => {
    try {
        const { title, content, categoryIds } = req.body;
        const emailUser = req.user.email;
    
       const userValid = await User.findOne({ where: { email: emailUser } });
       const blogPostData = await BlogPost.findOne({ where: { id } });

       if (blogPostData.userId !== userValid.id) {
        return res.status(401).json({ message: 'Unauthorized user' });
       }

        const newPost = await postService.servicePostPost({ title, content, userId });

        return res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};
*/

 const controllerUpdatePost = async (req, res, next) => {
    try {
       const { id } = req.params;
       const { title, content } = req.body;
       const emailUser = req.user.email;
    
       const userValid = await User.findOne({ where: { email: emailUser } });
       const blogPostData = await BlogPost.findOne({ where: { id } });

       if (blogPostData.userId !== userValid.id) {
        return res.status(401).json({ message: 'Unauthorized user' });
       }

        if (!title || !content) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }

        const updatePost = await postService.serviceUpdatePost(id, title, content);

        res.status(200).json(updatePost);
    } catch (error) {
        next(error);
    }
 };

 const controllerDeletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const emailUser = req.user.email;

        const userValid = await User.findOne({ where: { email: emailUser } });
        const blogPostData = await BlogPost.findOne({ where: { id } });

        if (!blogPostData) {
            return res.status(404).json({ message: 'Post does not exist' });
        }

        if (blogPostData.userId !== userValid.id) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        
       await postService.serviceDeletePost(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
 };

module.exports = { controllerGetPosts,
    controllerSearchPost,
    controllerGetPostById,
    // controllerCreatePost,
    controllerUpdatePost,
    controllerDeletePost };