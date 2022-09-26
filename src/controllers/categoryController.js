const categoryService = require('../services/categoryService');

const controllerPostCategory = async (req, res, next) => {
    try {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
        
    const createCategory = await categoryService.servicePostCategory({ name });
        
    return res.status(201).json(createCategory);
    } catch (error) {
        next(error);
    }
};

const controllerGetCategories = async (req, res, next) => {
    try {
        const getCategories = await categoryService.serviceGetCategories();
        res.status(200).json(getCategories);
    } catch (error) {
        next(error);
    }
};

module.exports = { controllerPostCategory, controllerGetCategories };