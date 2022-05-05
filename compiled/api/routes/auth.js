"use strict";

const AuthController = require("./controllers/auth");

const authController = new AuthController(); //middleware

const Async = require("../../middlewares/validations/Asynchandler");

const validator = require("../../middlewares/validations/auth");

const express = require("express");

const router = express.Router(); //register
//login
//reset-password

router.post("/register", validator.register, Async(authController.register));
router.post("/login", validator.login, Async(authController.login));
router.post("/password-reset", Async(authController.password_reset));
router.post("/change-password/:id/token", Async(authController.newPassword));
module.exports = router;