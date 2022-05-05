"use strict";

const handler = require('../utils/resHandler');

const CartModel = require("../models/cart");

const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
module.exports = class CartService {
  async create(cart) {
    const Cart = await new CartModel(cart);
    return Cart.save();
  }

  async update(...cart) {
    const [id, body] = cart;
    return await CartModel.updateOne({
      userId: ObjectId(id)
    }, {
      $set: body
    }, {
      new: true
    });
  } // delete


  async delete(Cart) {
    return await CartModel.deleteOne({
      userId: ObjectId(Cart)
    });
  } //show cart product 


  async getCart(cart) {
    console.log(cart);
    return await CartModel.aggregate([{
      $match: {
        userId: ObjectId(cart)
      }
    }, {
      $unwind: "$product"
    }, {
      $lookup: {
        from: "products",
        localField: "product.productId",
        foreignField: "_id",
        as: "product.productId"
      }
    }, {
      $unwind: "$product.productId"
    }, {
      $project: {
        _id: 0,
        userId: 1,
        product: {
          productId: {
            _id: 1,
            title: 1
          },
          quantity: 1
        },
        totalPrice: 1
      }
    }]);
  } //show unique cart for each user


  async getAllCart() {
    return await CartModel.aggregate([{
      $match: {}
    }, {
      $group: {
        _id: '$userId',
        product: {
          $addToSet: '$product'
        },
        totalprice: {
          $sum: '$totalPrice'
        }
      }
    }, {
      $project: {
        _id: 0,
        username: '$_id',
        Cart: '$product',
        totalprice: '$totalprice'
      }
    }]);
  }

};