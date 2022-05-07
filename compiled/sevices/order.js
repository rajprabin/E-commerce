"use strict";

const handler = require('../utils/resHandler');

const MyOrderModel = require('../models/myOrder');

const OrderDetail = require('../models/orderDetail');

const OrderItem = require('../models/orderItem');

const OrderModel = require("../models/order");

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
module.exports = class OrderService {
  async create(order) {
    const Order = await new OrderModel(order);
    return Order.save();
  } //user my order


  async getMyOrder(userId) {
    return await MyOrderModel.findOne({
      userId: userId
    }).populate('product', 'title price -_id').select('-_id -__v -createdAt -updatedAt');
  } //to change order


  async update(...product) {
    const [id, body] = product;
    return await ProductModel.findByIdAndUpdate({
      userId: id
    }, {
      $set: body
    }, {
      new: true
    });
  } //to cancel order


  async delete(order) {
    console.log("sucess1");
    return await OrderModel.deleteOne({
      userId: ObjectId(order)
    });
  } //to cancel one  product in order


  async deleteOne(...product) {
    console.log("sucess");
    const [id, query] = product;
    console.log(query);
    return await OrderModel.findOneAndUpdate({
      _id: id
    }, {
      $pull: {
        orderItem: query
      }
    }, {
      new: true
    });
  } //user order


  async getOrder(id) {
    return await OrderModel.aggregate([{
      $match: {
        userId: ObjectId(id)
      }
    }, {
      $unwind: "$orderItem"
    }, {
      $lookup: {
        from: "products",
        localField: "orderItem.product",
        foreignField: "_id",
        as: "orderItem.product"
      }
    }, {
      $unwind: "$orderItem.product"
    }]);
  } // all user order 


  async getAllOrder() {
    return await OrderModel.aggregate([{
      $match: {}
    }, {
      $group: {
        _id: '$userId',
        totalprice: {
          $sum: '$totalPrice'
        },
        status: {
          $push: '$status'
        }
      }
    }, {
      $project: {
        user: '$_id',
        totalPriceSpend: '$totalprice',
        status: '$status'
      }
    }]);
  }

  async orderItem(body) {
    let orderItem = await OrderItem(body).save();
    return orderItem;
  }

  async orderDetail(body) {
    let orderDetail = await OrderDetail(body).save();
    return orderDetail;
  }

};