const { Sequelize } = require('sequelize');

const userModel = require('./users')
const transactionModel = require('./transaction')

exports.db_config = new Sequelize(
  'nest_backend',
    // 'dummy',
    // 'root',
    'root',
    // 'password',
    'password',
    {
      host:  'localhost',
      // host :'localhost',
      dialect: 'mysql',
      operatorsAliases: 0,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      timezone: '+05:30',
      logging: false,
    }
  );

  

exports.userModel = userModel(exports.db_config);
exports.transactionModel = transactionModel(exports.db_config)