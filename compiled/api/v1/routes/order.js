"use strict";

const OrderController = require('../controllers/order');

const orderController = new OrderController(); //middleware

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../../../middlewares/v1/authorize');

const Async = require('../../../middlewares/v1/Asynchandler');

const express = require('express');

const router = express.Router(); //CREATING THE ORDER => USER
//show history of myorder => user
//MODIFYING THE ORDER => USER
//DELETE THE ORDER => USER
//GET USER ORDER => Admin
//GET  ALL ORDER => admin

router.post('/create/:id', [verifyTokenAndAuthorization], Async(orderController.create));
router.get('/myOrder/:id', [verifyTokenAndAuthorization], Async(orderController.getMyOrder));
router.put('/update/:id', [verifyTokenAndAuthorization], Async(orderController.update));
router.delete('/delete/:id', [verifyTokenAndAuthorization], Async(orderController.delete));
router.get('/get/:id', [verifyTokenAndAdmin], Async(orderController.getOrder));
router.get('/getAll', [verifyTokenAndAdmin], Async(orderController.getAllOrder)); //for order purpose

router.post('/orderItem', [verifyTokenAndAuthorization], Async(orderController.orderItem)); //for order purpose

router.post('/orderDetail', [verifyTokenAndAuthorization], Async(orderController.orderItem));
module.exports = router;