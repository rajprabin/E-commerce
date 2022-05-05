"use strict";

const Handler = require('../../../utils/resHandler');

const joi = require("joi");

joi.objectId = require('joi-objectid')(joi);

exports.add = (req, res, next) => {
  const schema = joi.object({
    product: joi.objectId(),
    totalPrice: when('product', {
      then: joi.required()
    })
  });
  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) next(new Error(error.details[0].message));else next();
};