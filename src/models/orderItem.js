const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      quantity: {
        type: Number,
      },
    },
    orderDetail: {
      type: mongoose.Types.ObjectId,
      ref: "OrderDetail",
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderItem", orderItemSchema);
