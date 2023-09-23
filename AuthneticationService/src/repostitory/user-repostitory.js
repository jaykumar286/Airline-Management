const {User,Role} = require("../models/index");
const ValidationError = require("../utils/validation-error");
const AppError = require("../utils/error-handler");

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name = "SequelizeValidationError"){
               throw new ValidationError(error);
            }
            throw new AppError("ServerError","Something went on Server",);
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes:["email","id"],
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in repo layer!!");
            throw {error}
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email:userEmail
                }
            });
            console.log(user);
            return user;
        } catch (error) {
            console.log("Something went wrong fetching user based on email!!");
            throw error;
        }
    }
    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            })
            return true;
        } catch (error) {
            console.log("Something went wrong in repo layer!!");
            throw {error};
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne(
                {
                    where:{
                        name:"ADMIN"
                    }
                }
            )
            return user.hasRole(adminRole);
        } catch (error) {
            throw error;
            console.log("Something went wrong on admin verifition in Repo Layer!!");
        }
    }
};

module.exports = UserRepository;