"use strict";

//productCategory =>name,desc
//productInventory=>quantity
//discount =>name ,desc,discountpercent,active
const mongoose = require("mongoose");

const productCategory = mongoose.Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  }
});
const productInventory = mongoose.Schema({
  quantity: {
    type: Number
  }
});
const discount = mongoose.Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  },
  discountpercent: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  }
});
const productAttributesSchema = mongoose.Schema({
  productCategory,
  productInventory,
  discount
}, {
  timestamps: true
});
module.exports = mongoose.model('ProductAttribute', productAttributesSchema);