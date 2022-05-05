"use strict";

const logger = require('../../utils/logger');

module.exports = function (err, req, res, next) {
  if (err) {
    res.status(400).send({
      'message': 'some thing failed',
      'message': err.message
    });
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`); //console.log(err)
  } else {
    res.status(500).send({
      'message': 'InternalServerError'
    });
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }
};