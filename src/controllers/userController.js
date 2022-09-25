require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET;

const controllerPostUser = async (req, res, next) => {
   try {
    const { displayName, email, image } = req.body;
    const user = await userService.servicePostUser({ displayName, email, image });

    if (user.email !== email) {
        return res.status(409)
        .json({ message: 'User already registered' });
    }
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    const payload = { email, displayName, image };
    const token = jwt.sign(payload, secret, jwtConfig);
    
    res.status(201).json({ token });
   } catch (error) {
    next(error);
   }
};

module.exports = { controllerPostUser };