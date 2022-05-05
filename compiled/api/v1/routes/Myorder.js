"use strict";

const MyOrderController = require('../controllers/Myorder');

const myOrderController = new MyOrderController(); //middleware

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../../../middlewares/v1/authorize');

const Async = require('../../../middlewares/v1/Asynchandler');

const express = require('express');

const router = express.Router(); //user create => USer
//user update => USer
//user delete => USer
//all user order => admin 

router.post('/create/:id', [verifyTokenAndAuthorization], Async(myOrderController.create));
router.put('/update/:id', [verifyTokenAndAuthorization], Async(myOrderController.update));
router.delete('/delete/:id', [verifyTokenAndAuthorization], Async(myOrderController.delete));
router.get('/get/:id', [verifyTokenAndAuthorization], Async(myOrderController.getMyOrder));
router.get('/status', [verifyTokenAndAdmin], Async(myOrderController.getAll_MyOrder));
module.exports = router;