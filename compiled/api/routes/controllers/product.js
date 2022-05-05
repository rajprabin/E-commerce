"use strict";

const ProductService = require('../../../sevices/product');

const productService = new ProductService();
module.exports = class ProductController {
  async create(req, res) {
    const response = await productService.create(req.body);
  }

  async update(req, res) {
    const response = await productService.update(req.params, req.body);
  }

  async delete(req, res) {
    const response = await productService.delete(req.params);
  }

  async getProduct(req, res) {
    const response = await productService.getProduct(req.params);
  }

  async getAllProduct(req, res) {
    const response = await productService.getAllProduct(req.params);
  }

};