const {DataTypes} = require('sequelize');


module.exports = (db_config) => {
    const user = db_config.define(
        'user',{

            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                default:null,

            },
            dob: {
                type: DataTypes.STRING,
                allowNull: true,
            },
             gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true
            },
    });

    return user;
}