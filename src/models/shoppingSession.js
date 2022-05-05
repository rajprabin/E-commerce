const mongoose = require("mongoose");

const shoppingSessionSchema = mongoose.Schema(
  {
    userId:{
     type:mongoose.Types.ObjectId   
    },
    total:{
      type:Number
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ShoppingSession", shoppingSessionSchema);
