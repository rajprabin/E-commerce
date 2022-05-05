"use strict";

const OrderController = require('../../api/routes/controllers/order');

const orderController = new OrderController(); //middleware

const Async = require('../../middlewares/validations/Asynchandler');

const express = require('express');

const router = express.Router(); //CREATING THE ORDER => USER
//MODIFYING THE ORDER => ADMIN
//DELETE THE ORDER => USER
//GET USER ORDER => USER
//GET  ALL ORDER => admin

router.post('/', Async(orderController.create));
router.put('/', Async(orderController.update));
router.delete('/', Async(orderController.delete));
router.get('/', Async(orderController.getOrder));
router.get('/', Async(orderController.getAllOrder));
module.exports = router;