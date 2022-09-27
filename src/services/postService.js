const { BlogPost, User, Category } = require('../models');

const serviceGetPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
    });
    return posts;
};

const serviceGetPostById = async (id) => {
    const posts = await BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' }],
 });
    return posts;
};

const serviceUpdatePost = async (id, title, content) => {
    const post = await BlogPost.findOne({ where: { id } });
    
    await post.update({ title, content });
    
   const newPost = await BlogPost.findOne({ where: { id },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
    });
    return newPost;
};

module.exports = { serviceGetPosts, serviceGetPostById, serviceUpdatePost };