const {response} = require("express");
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req,res) =>{
    try {
        const userData = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json(
            {
                data:userData,
                err:{},
                message:"Successfully user created!!",
                isSucess:true
            }
        );
        
    } catch (error) {
        return res.status(500).json({
            data:{},
            err:{error},
            message:"something went wrong",
            isSucess:false
        });
    }
}

module.exports = {
    create
}