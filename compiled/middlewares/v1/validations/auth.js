"use strict";

const Handler = require('../../../utils/resHandler');

const joi = require("joi");

exports.register = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().min(3).max(255).required(),
    email: joi.string() //any character and one spl character 
    .regex(new RegExp("^[a-z A-z 0-9 _ /-/. ]*[@][a-z]{3,6}[/.][a-z]{2,4}$")).email().min(3).max(255).required(),
    password: joi.string() // 1 capital chars 1 small chars 1 spl chars any num
    .regex(new RegExp('^[A-Z]+[a-z]+[@][0-9]{1,}')).min(3).max(1024).required(),
    conformPassword: joi.any().valid(joi.ref('password')).required(),
    role: joi.string()
  });
  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) next(new Error(error.details[0].message));else next();
};

exports.login = (req, res, next) => {
  const schema = joi.object({
    email: joi.string() //any character and one spl character 
    .regex(new RegExp("^[a-z A-z 0-9 _ /-/. ]*[@][a-z]{3,6}[/.][a-z]{2,4}$")).email().min(3).required(),
    password: joi.string() // 1 capital chars 1 small chars 1 spl chars any num
    .regex(new RegExp('^[A-Z]+[a-z]+[@][0-9]{1,}')).min(3).required()
  });
  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) next(new Error(error.details[0].message));else next();
};