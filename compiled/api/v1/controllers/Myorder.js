"use strict";

const Handler = require("../../../utils/resHandler");

const _ = require('lodash');

const MyOrderService = require('../../../sevices/Myorder');

const myOrderService = new MyOrderService();
module.exports = class MyOrderController {
  async create(req, res) {
    req.body.userId = req.user.id;
    req.body = _.pick(req.body, ['userId', 'product']);
    const response = await myOrderService.create(req.body);
    if (!response) return Handler.badRequest('Enter Valid credential', false, res);
    return Handler.created('Created', response, res);
  }

  async update(req, res) {
    const id = req.user.id;
    const response = await myOrderService.update(id, req.body);
    if (!response) return Handler.notFound('NotFound', false, res);
    return Handler.success('updated', response, res);
  }

  async delete(req, res) {
    const id = req.user.id;
    const response = await myOrderService.delete(id);
    if (!response) return Handler.notFound('NotFound', false, res);
    return Handler.success('deleted', false, res);
  }

  async getMyOrder(req, res) {
    const id = req.user.id;
    const response = await myOrderService.getMyOrder(id);
    if (!response) return Handler.notFound('Not Found', false, res);
    return Handler.success('ok', response, res);
  }

  async getAll_MyOrder(req, res) {
    const response = await myOrderService.getAll_MyOrder();
    if (!response) return Handler.notFound('Not Found', false, res);
    return Handler.success('All Users MyOrder', response, res);
  }

};