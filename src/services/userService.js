require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const servicePostUser = async ({ displayName, email, password, image }) => {
   await User.create({ displayName, email, password, image });

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const token = jwt.sign({ email }, secret, jwtConfig);

    return token;
};
 
 module.exports = { servicePostUser };