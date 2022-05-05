const Handler = require('../../utils/resHandler')
const CONFIG = require('../../configuration/config')
const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
 let token =  req.headers['authorization']
 if(token){
  token = token.split(" ")[1]
  jwt.verify(token,CONFIG.secretkey,(err,user)=>{
      if(err) return Handler.badRequest('Token Is Invalid',false,res)
      req.user = user
      next()
  })
 }else {
     return Handler.unauthorized('You Are Not Aunthenticated',false,res)
 }
}


const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.role === 'Admin' ) {
            next()
        }else{
            return Handler.forbidden('You Are Not Allowed',false,res)
        }
    })
}

const verifyTokenAndAdmin =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role === 'Admin'){
            next()
        }else{
            return Handler.forbidden('Only Admin Can Handle This',false,res)
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
}