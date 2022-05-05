"use strict";

const CartController = require('../../api/routes/controllers/Cart');

const cartController = new CartController(); //middleware

const Async = require('../../middlewares/validations/Asynchandler');

const express = require('express');

const router = express.Router(); //CREATE
//UPDATE
//DELETE
//GETUSERCART
//GETALLCART

router.post('/', Async(cartController.create));
router.put('/', Async(cartController.update));
router.delete('/', Async(cartController.delete));
router.get('/', Async(cartController.getCart));
router.get('/', Async(cartController.getAllCart));
module.exports = router;