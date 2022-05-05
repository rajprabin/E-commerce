"use strict";

module.exports = (err, req, res, next) => {
  res.status(404).send({
    status: "someThingFailed",
    message: [err.message]
  });
};