require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET;

const controllerPostUser = async (req, res, next) => {
    try {
    const { email, password, displayName, image } = req.body;
        
    await userService.servicePostUser({ email, password, displayName, image });

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const token = jwt.sign({ email }, secret, jwtConfig);
        
    return res.status(201).json({ token });
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

const controllerGetUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getUser = await userService.serviceGetUserById(id);

        if (!getUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        
        res.status(200).json(getUser);
    } catch (error) {
        next(error);
    }
};

const controllerDeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userService.serviceDeleteUser(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

module.exports = { controllerPostUser,
    controllerGetUsers,
    controllerGetUserById,
    controllerDeleteUser };