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

/* const servicePostPost = async ({ title, content, categoryIds }) => {
    const newPost = await BlogPost.create({ title, content, categoryIds });
    return newPost;
};
*/

const serviceUpdatePost = async (id, title, content) => {
    await BlogPost.update({ title, content }, { where: { id } });
    
   const newPost = await BlogPost.findOne({ where: { id },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
    });
    return newPost;
};

const serviceDeletePost = async (id) => {
    await BlogPost.destroy({ where: { id } });
};

module.exports = { serviceGetPosts,
    serviceGetPostById,
    // servicePostPost,
    serviceUpdatePost,
    serviceDeletePost };