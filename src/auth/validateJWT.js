const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv/config');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
       const verify = jwt.verify(authorization, secret);
       const userValid = await User.findOne({ where: { email: verify.email } });

       if (!userValid) {
        return res.status(401).json({ message: 'Unauthorized user' });
       }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = { validateJWT };