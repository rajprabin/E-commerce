"use strict";

const _ = require('lodash');

const CartService = require('../../../sevices/cart');

const cartservice = new CartService();
module.exports = class CartController {
  async create(res, req) {
    req.body = _.pick(req.body, ['userId', 'product', 'quantity']);
    const response = await cartservice.create(req.body);
  }

  async update(res, req) {}

  async delete(res, req) {}

  async getCart(res, req) {}

  async getAllCart(res, req) {}

};