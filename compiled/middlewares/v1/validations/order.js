"use strict";

const Handler = require('../../../utils/resHandler');

const joi = require("joi");

exports.login = (req, res, next) => {
  const schema = joi.object({
    orderItem,
    totalPrice,
    paymentDetail,
    address,
    status
  });
  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) next(new Error(error.details[0].message));else next();
};