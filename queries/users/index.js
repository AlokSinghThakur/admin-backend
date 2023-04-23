const userModule = require('../../models').userModel;
const { Sequelize } = require('sequelize');

module.exports = {
    async getUserByEmail(email){
        return await userModule.findOne({where:{email:email}})
    },

    async getUserData(){
        return await userModule.findAll()
    },

    async getAdminDataByEmail(email){
        return await userModule.findOne({where:{status:"admin",email:email}})
    },

    async getPowerUserDataByEmail(email){
        return await userModule.findOne({where:{status:"poweruser",email:email}})
    },

    async getSupportDataByEmail(email){
        return await userModule.findOne({where:{status:"Support",email:email}})
    },


    async addUser(data){
        return await userModule.create(data)
    },

    async changePassword(password,userId){
        return await userModule.update({password:password},{where:{id:userId}})
    },

    async login(){

    }

}
