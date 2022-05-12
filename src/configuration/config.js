const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  uri: process.env.URI,
  secretkey: process.env.SECRETKEY,
  port: process.env.PORT,
  exp: process.env.EXPIRY,
  Url: `https://e-commerce-node-deploy.herokuapp.com`,

  email: process.env.USER_EMAIL,
  host: "smtp.gmail.com",
  service: "gmail",
  user: process.env.ADMIN_EMAIL,
  pass: process.env.ADMIN_PASWORD,
};
