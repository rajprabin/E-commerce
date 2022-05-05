const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const myOrderSchema = new mongoose.Schema({
    userId:{
       type:ObjectId,
       ref:'User'
    },
    product:{
        type:ObjectId,
        ref:'Product'
    },
    deliveredAt:{
        type:Date,
        default:Date.now()

    },
    status:{
        type:String,
        enum:['completed','refunded'],
        default:'completed'
    }
},{timestamps:true})

module.exports = mongoose.model('MyOrder',myOrderSchema)