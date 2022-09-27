const { User } = require('../models');

const servicePostUser = async ({ email, password, displayName, image }) => {
   const user = await User.create({ email, password, displayName, image });
    return user;
};

const serviceGetUsers = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return users;
};

const serviceGetUserById = async (id) => {
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    return user;
};

const serviceDeleteUser = async (id) => {
    await User.destroy({ where: { id } });
};
 
 module.exports = { servicePostUser, serviceGetUsers, serviceGetUserById, serviceDeleteUser };