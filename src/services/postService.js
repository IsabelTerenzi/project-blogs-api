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

module.exports = { serviceGetPosts, serviceGetPostById };