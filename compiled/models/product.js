"use strict";

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  },
  SKU: {
    type: String
  },
  img: {
    type: String
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "ProductAttribute"
  },
  inventory_id: {
    type: mongoose.Types.ObjectId,
    ref: "ProductAttribute"
  },
  price: {
    type: Number
  },
  discount_id: {
    type: mongoose.Types.ObjectId,
    ref: "ProductAttribute"
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Product", productSchema);