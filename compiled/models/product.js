"use strict";

const mongoose = require("mongoose"); // const productSchema = new mongoose.Schema({
//       title:{
//             type:String,
//             required:true
//       },
//       description:{
//             type:String,
//             required:true
//       },
//       img:{
//             type:String,
//             required:true
//       },
//       categories:{
//             type:Array,
//           // required:true
//       },
//       size:{
//            type:Array,
//           // required:true
//       },
//       color:{
//             type:Array,
//             required:true
//       },
//       price:{
//             type:Number,
//             required:true
//       },
// },{timestamps:true})


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