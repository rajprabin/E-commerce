
const mongoose = require("mongoose");



// const productSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//     },
//     desc: {
//       type: String,
//     },
//     SKU: {
//       type: String,
//     },
//     img: {
//       type: String,
//     },

//     category_id: {
//       type: mongoose.Types.ObjectId,
//       ref: "ProductAttribute",
//     },
//     inventory_id: {
//       type: mongoose.Types.ObjectId,
//       ref: "ProductAttribute",
//     },
//     price: {
//       type: Number,
//     },
//     discount_id: {
//       type: mongoose.Types.ObjectId,
//       ref: "ProductAttribute",
//     },
//   },
//   { timestamps: true }
// );

const productSchema = mongoose.Schema({
 id:{
        type:String
      },
      name:{
        type:String
      },
      description:{
        type:String
      },
      price:{
        type:Number
      },
      stars:{
        type:String
      },
      img:{
        type:String
      },
      location:{
        type:String
      },
      type_id:{
        type:Number
      }
      
    
  

},{
  timestamps:true, toObject: {
    transform: function(doc,ret,options){
       ret._id = ret.id
        delete ret._id;
        delete ret.__v;
        return ret;
    }}
})

module.exports = mongoose.model("Product", productSchema);
