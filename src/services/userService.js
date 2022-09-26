require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const servicePostUser = async ({ email, password, displayName, image }) => {
   await User.create({ email, password, displayName, image });

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const token = jwt.sign({ email }, secret, jwtConfig);

    return token;
};

const serviceGetUsers = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
};
 
 module.exports = { servicePostUser, serviceGetUsers };