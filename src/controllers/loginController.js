require('dotenv/config');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = process.env.JWT_SECRET;

const isBodyValid = (email, password) => email && password;

const controllerPostLogin = async (req, res, next) => {
   try {
    const { email, password } = req.body;

    if (!isBodyValid(email, password)) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await loginService.serviceLogin({ email });

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const token = jwt.sign({ email }, secret, jwtConfig);
    
    res.status(200).json({ token });
   } catch (error) {
    next(error);
   }
};

module.exports = { controllerPostLogin };