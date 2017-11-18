export default (sequelize, DataTypes) => {
    let Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Category.associate = models => {
        Category.belongsTo(models.user, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            },
            targetKey: 'id'
        });

        Category.hasMany(models.expense, {
            allowNull: true,
            defaultValue: null
        })
    };

    return Category;
};