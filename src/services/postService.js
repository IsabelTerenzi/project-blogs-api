const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, User, Category, PostCategory } = require('../models');

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

const serviceGetPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
    });
    return posts;
};

const serviceSearchPost = async (name) => {
    const search = await BlogPost.findOne({ where: {
        [Op.or]: [
            { title: { [Op.like]: `%${name}%` } },
            { content: { [Op.like]: `%${name}%` } },
        ],
    },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' }],
});

    if (!search) {
        return [];
    }
    return [search];
};

const serviceGetPostById = async (id) => {
    const posts = await BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' }],
 });
    return posts;
};

const servicePostPost = async ({ title, content, categoryIds }, emailUser) => {
    try {
        const validCategory = await (await Promise.all(categoryIds.map((email) => (
            Category.findOne({ where: email }))))).every((i) => i !== null);

        if (!validCategory) throw new Error('"categoryIds" not found', 400);

        const newBlogPost = await sequelize.transaction(async (t) => {
            const post = await BlogPost.create({ title, content, email: emailUser, categoryIds },
                { transaction: t });

            const idPost = post.dataValues.id;
        
            await Promise.all(categoryIds.map(async (id) => PostCategory
            .create({ postId: idPost, categoryId: id },
                    { transaction: t })));
            return post;
    });
        return newBlogPost;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

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
    serviceSearchPost,
    serviceGetPostById,
    servicePostPost,
    serviceUpdatePost,
    serviceDeletePost };