"use strict";

const _ = require('lodash');

const OrderService = require('../../../sevices/order');

const Orderservice = new OrderService();
module.exports = class OrderController {
  async create(req, res) {
    req.body = _.pick('req.body', ['userId', 'product', 'amount', 'address', 'status']);
    const response = Orderservice.create(req.body);
    res.send('done');
  }

  async update(req, res) {}

  async delete(req, res) {}

  async getOrder(req, res) {}

  async getAllOrder(req, res) {}

};