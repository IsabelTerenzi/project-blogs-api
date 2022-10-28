const { User, BlogPost } = require('../models');

const namePasswordValidation = async (req, res, next) => {
    const { email, displayName, password } = req.body;

    if (displayName.length < 8) {
        return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }

    if (!email.includes('@') && !email.includes('.com')) {
        return res.status(400).json({ message: '"email" must be a valid email' });
    }
    
    if (password.length < 6) {
        return res.status(400)
        .json({ message: '"password" length must be at least 6 characters long' });
    }

    next();
};

const emailValidation = async (req, res, next) => {
    const { email } = req.body;

    const emailAlreadyExists = await User.findOne({ where: { email } });

    if (emailAlreadyExists) {
        return res.status(409).json({ message: 'User already registered' });
    }

    next();
};

const authorizedUser = async (req, res, next) => {
    const { id } = req.params;
    const emailUser = req.user.email;

        const userValid = await User.findOne({ where: { email: emailUser } });
        const blogPostData = await BlogPost.findOne({ where: { id } });

        if (!blogPostData) {
            return res.status(404).json({ message: 'Post does not exist' });
        }

        if (blogPostData.userId !== userValid.id) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        next();
};

module.exports = { namePasswordValidation, emailValidation, authorizedUser };