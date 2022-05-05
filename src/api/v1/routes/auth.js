const AuthController = require("../controllers/auth");
const authController = new AuthController();

//middleware
const {verifyToken,verifyTokenAndAuthorization} = require('../../../middlewares/v1/authorize')
const Async = require("../../../middlewares/v1/Asynchandler");
const validator = require("../../../middlewares/v1/validations/auth");

const express = require("express");
const router = express.Router();

//register
//login
//reset-password

router.post("/register", validator.register,Async(authController.register));

router.post("/login", validator.login,Async(authController.login));

router.post("/reset_password/:id", [verifyTokenAndAuthorization],Async(authController.password_reset));

router.post("/change_password/:id/:token",[verifyTokenAndAuthorization],Async(authController.newPassword));

module.exports = router;
