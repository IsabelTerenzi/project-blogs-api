const userService = require('../services/userService');

const controllerPostUser = async (req, res) => {
    const { email, password, displayName, image } = req.body;
    
    const createUser = await userService.servicePostUser({ email, password, displayName, image });
    
    return res.status(201).json({ token: createUser });
};

module.exports = { controllerPostUser };