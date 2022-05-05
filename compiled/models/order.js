"use strict";

const mongoose = require("mongoose");

const {
  userAdressSchema
} = require("../models/user");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderItem: {
    type: mongoose.Types.ObjectId,
    ref: "OrderItem",
    required: true
  },
  address: {
    type: userAdressSchema,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "ordered"],
    default: "pending"
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Order", orderSchema);