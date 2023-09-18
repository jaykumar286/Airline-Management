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

const signin = async(req,res) => {
    try {
        const token = await userService.signin(req.body.email,req.body.password);
        return res.status(200).json(
            {
                data:token,
                err:{},
                message:"Succefully sign in!!",
                isSucess:true
            }
        )
    } catch (error) {
        res.status(500).json({
            data: {},
            err:error,
            message:"Unsuccesfully in sign in!!",
            isSucess:false
        }
        );
    }
}

const isAuthenticate = async (req,res) => {
    try {
        const response = await userService.isAuthentication(req.headers["x-access-token"]);
        return res.status(200).json(
            {
                data:response,
                err:{},
                message:"Succefull in authentication!!",
                isSuccess:true
            }
        );
    } catch (error) {
        console.log("Autentication fail!!");
        return res.status(404).json(
            {
                data:{},
                err:"User Authentication fails!!",
                message:"User Authentication fails!!",
                isSuccess:false
            }

        );
    }
}

module.exports = {
    create,
    signin,
    isAuthenticate
}