const {validatedUserAuth, validateAdminRequest} = require("./auth-request-validator");

module.exports = {
    AuthValidator : validatedUserAuth,
    AdminValidator : validateAdminRequest

}