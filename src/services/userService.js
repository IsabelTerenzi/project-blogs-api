const { User } = require('../models');

const serviceLogin = async ({ email, password }) => {
   const user = await User.findOne({ where: { email, password } });

   return user;
};

module.exports = { serviceLogin };