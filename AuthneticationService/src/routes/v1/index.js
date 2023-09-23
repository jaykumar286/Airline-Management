const express = require("express");

const UserController = require("../../controllers/user-controller");
const RequestValidator = require("../../middlewares/index");

const router = express.Router();

router.post("/signup",RequestValidator.AuthValidator,UserController.create);
router.post("/signin",RequestValidator.AuthValidator,UserController.signin);

router.get("/isAuthenticated",UserController.isAuthenticate);
router.get("/isAdmin",RequestValidator.AdminValidator,UserController.isAdmin)

module.exports = router;