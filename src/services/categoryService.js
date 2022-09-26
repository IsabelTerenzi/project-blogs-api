const { Category } = require('../models');

const servicePostCategory = async ({ name }) => {
   const category = await Category.create({ name });
   
    return category;   
};

module.exports = { servicePostCategory };