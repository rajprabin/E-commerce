const handler = require('../utils/resHandler')

const MyOrderModel = require("../models/Myorder");
const { default: mongoose } = require('mongoose');

module.exports = class MyOrderService {
  async create(myOrder) {
    const MyOrder = await new MyOrderModel(myOrder);
    return MyOrder.save();
  }
  async update(...myOrder) {
    const [id, body] = myOrder;
   return await MyOrderModel.findByIdAndUpdate(
      { userId: id },
      { $set: body },
      { new: true }
    );
  }

  // delete
  async delete(myOrderId) {
    return await MyOrderModel.deleteOne({userId:mongoose.Types.ObjectId(myOrderId)})
  }
//get myorder  
  async getMyOrder(userId) {
   return await MyOrderModel.findOne({ userId: userId }).populate('product','title price -_id').select('-_id -__v -createdAt -updatedAt');
  }
//   show unique user and order status
  async getAll_MyOrder() {
   return await MyOrderModel.aggregate([
      { $match: {} },
      { $group: { _id:'$userId',status:{$last:'$status'} } },{$project:{_id:0,User:'$_id' , curentStatus:'$status'}}
    ]);
  }
};