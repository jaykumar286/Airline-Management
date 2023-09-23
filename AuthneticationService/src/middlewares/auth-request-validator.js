const validatedUserAuth = (req,res,next) => {
    if( !req.body.email || ! req.body.password){
        return res.status(500).json(
            {
                data:{},
                err:"Incorrect Request data!!",
                message:"Incorrect Request data!!",
                isSuccess:false
            }
        );
    }
    next();
};

const validateAdminRequest = (req,res,next) => {
    if (!req.body.id){
        return res.status(400).json(
            {
                data:{},
                err:"Incorrect Request data!!",
                message:"Incorrect Request data!!",
                isSuccess:false
            }

        );
    }
    next();
};

module.exports = {
    validatedUserAuth,
    validateAdminRequest
}