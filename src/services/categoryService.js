const { Category } = require('../models');

const servicePostCategory = async ({ name }) => {
   const category = await Category.create({ name });

    return category;   
};

const serviceGetCategories = async () => {
    const categories = await Category.findAll();

    return categories;
};

module.exports = { servicePostCategory, serviceGetCategories };