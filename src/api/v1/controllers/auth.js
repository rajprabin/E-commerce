const Handler = require("../../../utils/resHandler");

const sendEmail = require('../../../utils/sendEmail')
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CONFIG = require("../../../configuration/config");

const AuthService = require("../../../sevices/auth");
const authService = new AuthService();

module.exports = class AuthController {
    //SIGNUP
  async register(req, res) {
    //hashing password
    const password = req.body.password;
   // const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password, 10);
    
    req.body.password = encrypted;

    const user = _.pick(req.body, ["username", "email", "password","role"]);

    let result = await authService.register(user);
    if(!result) return Handler.badRequest('enter correct credentials',false,res)
     result = _.pick(result, ["username", "email"])
    return Handler.created('registered',result,res)
  }
   //LOGIN
  async login(req, res) {
    
 
   req.body = _.pick(req.body, [ "email", "password"]);
     
    let result = await authService.login(req.body);
    if (!result)return Handler.notFound('Incorrect Email',false,res)
    //camparing
    const password = await bcrypt.compare(req.body.password, result.password);
    if (!password) return Handler.notFound('Incorrect Password',false,res)

     const token = jwt.sign({id:result._id,role:result.role},CONFIG.secretkey,{expiresIn:CONFIG.exp})

    // res.header('bearer-token',token).json({status:"LOGGED IN",AcessToken:token})
    return Handler.success('LOGGED IN',{AcessToken:token,ID:result._id},res)
  }

  //PASSWORD RESET

  async password_reset(req, res) {
    const email = req.body.email
    
    const token = await authService.password_reset(email);
    if (token) {
      const link = `${CONFIG.Url}/api/auth/change_password/${token.userId}/${token.token}`;
      console.log(link);
      await sendEmail(CONFIG.email||email, "Password reset", link);
      res.send("password reset link sent to your email account");
    }
   
   }

  async newPassword(req, res, next) {
    const { id, token } = req.params;
    const password = req.body.password;
    const response = await authService.newPassword(id, token, password);
    res.send({ description: "updated sucessfully", user:_pick(response ,['username','email','updatedAt']) });
};


}

