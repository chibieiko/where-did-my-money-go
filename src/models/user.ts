module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        username: {
            type:DataTypes.STRING
        }
    });

    User.associate = models => {
        User.hasMany(models.expense, {
            allowNull: true,
            defaultValue: null
        });
        User.hasMany(models.category, {
            allowNull: true,
            defaultValue: null
        })
    };

    return User;
};