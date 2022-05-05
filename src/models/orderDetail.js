
const mongoose = require('mongoose');
const { userAdressSchema } = require('./user');
orderDetailSchema =  mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
      },
      // if not address is registered
      address:{
       type:userAdressSchema,
       required:false
      },
   
    payment:{
        type:mongoose.Types.ObjectId,
        ref:'PaymentDetail'
      },
  },{timestamps:true})

  module.exports = mongoose.model("orderDetail", orderDetailSchema);
