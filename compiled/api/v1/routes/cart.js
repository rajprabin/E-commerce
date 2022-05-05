"use strict";

const CartController = require('../controllers/Cart');

const cartController = new CartController(); //middleware

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require('../../../middlewares/v1/authorize');

const Async = require('../../../middlewares/v1/Asynchandler');

const express = require('express');

const router = express.Router(); //CREATE => USER 
//UPDATE => USER 
//DELETE => USER
//GETUSERCART =>USER  
//GETALLCART => ADMIN

router.post('/add/:id', [verifyTokenAndAuthorization], Async(cartController.create));
router.put('/update/:id', [verifyTokenAndAuthorization], Async(cartController.update));
router.delete('/delete/:id', [verifyTokenAndAuthorization], Async(cartController.delete));
router.get('/getCart/:id', [verifyTokenAndAuthorization], Async(cartController.getCart));
router.get('/getAllCart', [verifyTokenAndAdmin], Async(cartController.getAllCart));
module.exports = router;