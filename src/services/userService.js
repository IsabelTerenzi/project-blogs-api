const { User } = require('../models');

const servicePostUser = async ({ displayName, email, image }) => {
    const user = await User.findOne({ where: { displayName, email, image } });
 
    return user;
 };
 
 module.exports = { servicePostUser };