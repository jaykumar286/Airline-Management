const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const UserRepository = require("../repostitory/user-repostitory");
const { JWT_KEY } = require('../config/server-config');
const e = require('express');
 

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name = "SequelizeValidationError"){
                throw error;
             }
             throw error;
        }

    }

    async signin(userEmail,plainPassword){
        try {
            const user = await this.userRepository.getByEmail(userEmail);
            if(!this.isComparePassword(plainPassword,user.password)){
                console.log("Password incorrect!!");
                throw error;
            }

            const jwtToken = this.createToken({email:userEmail,id:user.id});
            return jwtToken;
            
        } catch (error) {
            console.log("Something went wrong on sigin process!!");
            throw error;
        }
    }

    async isAuthentication(token){
        try {
            const isVerifyToken = this.verfiyToken(token);
            if(!isVerifyToken){
                console.log("Token is not correct!!");
                throw {error};
            }
            const user = await this.userRepository.getById(isVerifyToken.id);
            if (!user){
                console.log("User does not exist in DB!!");
                throw {error};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong on Authentication process!!");
            throw error;
        }
    }
   

    createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.log("Something went wrong on Token creation!!");
            throw error;
        }
    }

    verfiyToken(token){
        try {
            const isVerify = jwt.verify(token,JWT_KEY);
            return isVerify;
        } catch (error) {
            console.log("Something went wrong on Token verifition!!");
            throw error;
        }

    }

    isComparePassword(plainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(plainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong on password checking!!");
            throw error;
        }
    }


    async isAdmin(userId){
        try {
           const response = await this.userRepository.isAdmin(userId);
           return response;
        } catch (error) {
            throw error;
            console.log("Something went wrong on admin verifition!!");
        }
    }

}

module.exports = UserService;