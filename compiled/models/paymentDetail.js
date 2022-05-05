"use strict";

const mongoose = require('mongoose');

const paymentDetailSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Types.ObjectId,
    ref: 'OrderDetail'
  },
  amount: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },
  provider: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("PaymentDetail", paymentDetailSchema);