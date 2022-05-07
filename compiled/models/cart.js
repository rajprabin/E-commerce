"use strict";

const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  sessionId: {
    type: mongoose.Types.ObjectId,
    ref: 'ShoppingSession'
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Cart", cartSchema);