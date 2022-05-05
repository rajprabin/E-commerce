const Handler = require("../../../utils/resHandler");

const _ = require('lodash')

const CartService = require('../../../sevices/cart')
const cartService = new CartService()

module.exports = class CartController{
   async create(req,res){
    
     req.body.userId = req.user.id
      req.body =  _.pick(req.body,['userId','product','quantity'])
     const response =  await cartService.create(req.body)
     res.json(response)
   }
   async update(req, res) {
    const id = req.user.id
    const response = await cartService.update(id,req.body)
    res.send(response)
  }
  async delete(req, res) {
    const id = req.user.id;
    const response = await cartService.delete(id)
    res.send(response)
  }
  async getCart(req, res) {
    const id = req.user.id
    const response = await cartService.getCart(id)
    res.send(response)

  }
  async getAllCart(req, res) {
    const response = await cartService.getAllCart();
    res.send(response)
  }
}