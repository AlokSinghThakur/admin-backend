const {DataTypes} = require('sequelize');


module.exports = (db_config) => {
    const transaction = db_config.define(
        'transaction',{

            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
             amount: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true
            },
            is_disable: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
    });

    return transaction;
}