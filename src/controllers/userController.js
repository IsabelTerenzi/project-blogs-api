const userService = require('../services/userService');

const controllerPostUser = async (req, res, next) => {
    try {
    const { email, password, displayName, image } = req.body;
        
    const createUser = await userService.servicePostUser({ email, password, displayName, image });
        
    return res.status(201).json({ token: createUser });
    } catch (error) {
        next(error);
    }
};

const controllerGetUsers = async (req, res, next) => {
    try {
        const getUsers = await userService.serviceGetUsers();
        res.status(200).json(getUsers); 
    } catch (error) {
        next(error);
    }
};

module.exports = { controllerPostUser, controllerGetUsers };