const Handler = require("../../../utils/resHandler");
const _ = require("lodash");

const OrderService = require("../../../sevices/order");
const orderService = new OrderService();

module.exports = class OrderController {
  async  create(req, res) {
    req.body.userId = req.user.id;
    req.body = _.pick(req.body, [
      "userId",
      "orderItem",
      "totalPrice",
      "paymentDetail",
      "address",
      "status",
    ]);
    const response = await orderService.create(req.body);
    if (!response)
      return Handler.badRequest("Enter Valid Credential", false, res);
    return Handler.success("Order", response, res);
  }
  // to change order
  async update(req, res) {
    const id = req.user.id;
    const response = await orderService.update(id, req.body);
    if (!response) return Handler.notFound("Order Not Found", false, res);
    return Handler.success("Changed", response, res);
  }
  //to cancel order or  delete product
  async delete(req, res) {
    const id = req.user.id;
    
   const query = req.query
    console.log(query)
    const response = query
      ? await orderService.deleteOne(id,query)
      : await orderService.delete(id);
    if (!response) return Handler.notFound("Order Not Found", false, res);
    return Handler.success("Removed", response, res);
  }
  //
  async getOrder(req, res) {
    const id = req.user.id;
    const response = await orderService.getOrder(id);
    res.send(response);
  }
  async getAllOrder(req, res) {
    const response = await orderService.getAllOrder();
    res.send(response);
  }

  //Order Item

  async orderItem(req, res){
    _.pick(req.body,['productId','orderDetail'])
    await orderService.orderItem(req.body)
   }

   async orderDetail(req, res){
    _.pick(req.body,['productId','orderDetail'])
    await orderService.orderDetail(req.body)
   }
 
};
