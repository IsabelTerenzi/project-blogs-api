const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        displayName: DataTypes.SRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        tableName: 'users',
        underscored: true,
    });

    User.associate = (models) => {
        User.hasOne(models.BlogPost,
            { foreignKey: 'userId', as: 'blog_posts' });
    };

    return User;
};

module.exports = UserModel;