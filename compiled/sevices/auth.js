"use strict";

const handler = require('../utils/resHandler');

const bcrypt = require('bcryptjs');

const Crypto = require('crypto');

const TokenModel = require('../models/token');

const {
  UserModel
} = require("../models/user");

module.exports = class AuthService {
  //singup
  async register(user) {
    return await new UserModel(user).save();
  } //sign in


  async login(user) {
    return await UserModel.findOne({
      email: user.email
    });
  } //password reset


  async password_reset(userEmail) {
    console.log(userEmail);
    const user = await UserModel.findOne({
      email: userEmail
    });
    if (!user) throw new Error("user with given email doesn't exist");
    let Token = await TokenModel.findOne({
      userId: user._id
    });

    if (!Token) {
      Token = await new TokenModel({
        userId: user._id,
        token: Crypto.randomBytes(32).toString("hex")
      });
      return Token.save();
    } else return Token;
  }

  async newPassword(...User) {
    const [id, token, password] = User;
    const user = await UserModel.findOne({
      _id: id
    });
    if (!user) throw new Error("invalid link or notFound");
    const Token = await TokenModel.findOne({
      userId: id,
      token: token
    });
    if (!Token) throw new Error("Invalid link or expired");
    let newPassword = await bcrypt.hash(password, 10);
    newPassword = await UserModel.updateOne({
      name: user.name
    }, {
      $set: {
        password: newPassword
      }
    });
    Token.delete();
    return await UserModel.findOne({
      name: user.name
    }, {
      _id: 0,
      password: 0
    });
  }

};