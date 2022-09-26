const userService = require('../services/userService');

const controllerPostUser = async (req, res, next) => {
   try {
    const { displayName, email, password, image } = req.body;
    
    const createUser = await userService.servicePostUser({ displayName, email, password, image });
    
    return res.status(201).json({ token: createUser });
   } catch (error) {
    next(error);
   }
};

module.exports = { controllerPostUser };