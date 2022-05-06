"use strict";

const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  uri: process.env.URI,
  secretkey: process.env.SECRETKEY,
  port: process.env.PORT,
  exp: process.env.EXPIRY,
  Url: `http://localhost:3000`,
  email: `pravinrjpravin@gmail.com`,
  host: 'smtp.gmail.com',
  service: 'gmail',
  user: 'exdrs.emp.0032.rajprabin@gmail.com',
  pass: 'Rajprabin@16'
};