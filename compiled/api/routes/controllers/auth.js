"use strict";

const sendEmail = require('../../../utils/sendEmail');

const _ = require("lodash");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const CONFIG = require("../../../configuration/config");

const AuthService = require("../../../sevices/auth");

const authService = new AuthService();
module.exports = class AuthController {
  //SIGNUP
  async register(req, res) {
    //hashing password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); //hashed

    req.body.password = hashedPassword;

    const user = _.pick(req.body, ["username", "email", "password"]);

    let result = await authService.register(user);
    res.send({
      registered: _.pick(result, ["name", "email"])
    });
  } //LOGIN


  async login(req, res) {
    req.body = _.pick(req.body, ["email", "password"]);
    let result = await authService.login(req.body);
    if (!result) return res.status(400).send("Invalid Email"); //camparing

    const password = await bcrypt.compare(req.body.password, result.password);
    if (!password) return res.status(400).send("Invalid Password");
    const token = jwt.sign({
      id: result._id,
      isAdmin: result.isAdmin
    }, CONFIG.secretkey, {
      expiresIn: CONFIG.exp
    });
    res.json({
      status: "LOGGED IN",
      AcessToken: token
    });
  } //PASSWORD RESET


  async password_reset(req, res, next) {
    const token = await authService.password_reset(req.body.email);

    if (token) {
      const link = `${CONFIG.Url}/api/auth/change-password/${token.userId}/${token.token}`;
      console.log(link);
      await sendEmail(CONFIG.email, "Password reset", link);
      res.send("password reset link sent to your email account");
    }
  }

  async newPassword(req, res, next) {
    const {
      id,
      token
    } = req.params;
    const password = req.body.password;
    const response = await authService.newPassword(id, token, password);
    res.send({
      description: "updated sucessfully",
      user: response
    });
  }

};