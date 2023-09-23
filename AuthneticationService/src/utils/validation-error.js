const AppError = require("./error-handler");
const {StatusCodes} = require("http-status-codes")

class ValidationError extends AppError{
        
    constructor(error){
        let errorName = error.name;

        let errorExplnation = [];

        error.errors.forEach((err) => {
            errorExplnation.push(err.message);

        })

        super(
            errorName,
            "Not validated request data!!",
            errorExplnation,
            StatusCodes.BAD_REQUEST
        )
    }
}

module.exports = ValidationError