//client side error
exports.badRequest = async function (msg, payload, res) {
    sendResponse(400, msg, payload, res);
  };
  
exports.unauthorized = async function (msg, payload, res) {
    sendResponse(401, msg, payload, res);
  };

 
  exports.forbidden = async function (msg, payload, res) {
    sendResponse(403, msg, payload, res);
  };
  
  exports.notFound = async function (msg, payload, res) {
    sendResponse(404, msg, payload, res);
  };

  //internal server error
exports.exception = async function (msg, payload, res) {
    sendResponse(500, msg, payload, res);
  };

  //server side error
  exports.success = async function (msg, payload, res) {
    sendResponse(200, msg, payload, res);
  };
  
  exports.created = async function (msg, payload, res) {
    sendResponse(201, msg, payload, res);
  };
  
  exports.noContent = async function (msg, payload, res) {
    sendResponse(204, msg, payload, res);
  };
  
 

  function sendResponse(statusCode,msg,payload,res){
    if(!payload){
      res.status(statusCode).send({
        message:msg
      })
    }else {
      return res.status(statusCode).send({
        msg,
        payload
      })
    }
  }