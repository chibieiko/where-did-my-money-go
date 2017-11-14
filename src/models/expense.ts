module.exports = (sequelize, DataTypes) => {
    let Expense = sequelize.define('expense', {
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
            allowNull: false
        }
    });

    Expense.associate = models => {
        Expense.belongsTo(models.user, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            },
            targetKey: 'id'
        });

        Expense.belongsTo(models.category, {
            foreignKey: {
                allowNull: false
            },
            targetKey: 'id'
        })
    };

    return Expense;
};