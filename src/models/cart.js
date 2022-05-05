const mongoose = require("mongoose");


// const productSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Types.ObjectId,
//     ref: "Product",
//   },
//   quantity: {
//     type: Number,
//     default: 1,
//   },
// });

const cartSchema = mongoose.Schema(
  {
    sessionId:{
      type:mongoose.Types.ObjectId,
      ref:'ShoppingSession'
    },
    productId:{
      type:mongoose.Types.ObjectId,
      ref:'Product'
    },
    quantity:{
      type:Number,
  
    },
    // userId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required:true
    // },
    // product: [productSchema],

    // totalPrice: {
    //   type: Number,
    //  required: function () {
    //    return this.product;
    //  },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
