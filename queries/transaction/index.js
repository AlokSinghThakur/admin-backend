const transactionModule = require('../../models').transactionModel
const { Sequelize} = require('sequelize');

module.exports = {
    async addTransactionData(data){
        return await transactionModule.create(data)
    },

    async getTransactionByUserID(userId){
        return await transactionModule.findAll({where:{
            user_id : userId
        }})
    },

    async deleteTransactionById(id){
        return await transactionModule.update({is_disable:1},{where:{id:id}})
    }
}