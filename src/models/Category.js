const Category = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
    },
    {
        timestamps: false,
        tableName: 'categories',
        underscored: true,
    });

   // Category.associate = (models) => {
    //    Category.hasOne(models.PostCategory,
      //     { foreignKey: 'category_id', as: 'posts_categories' });
  //  };
    return Category;
};

module.exports = Category;