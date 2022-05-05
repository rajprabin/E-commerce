"use strict";

const ProductController = require('../../api/routes/controllers/product');

const productController = new ProductController(); //middleware

const Async = require('../../middlewares/validations/Asynchandler');

const express = require('express');

const router = express.Router(); //CREATE => ADMIN
//UPDATE => ADMIN
//DELETE => ADMIN
//GET ONE PRODUCT => USER AND ADMIN 
//GET ALL PRODUCT => USER AND ADMIN

router.post('/', Async(productController.create));
router.put('/', Async(productController.update));
router.delete('/', Async(productController.delete));
router.get('/', Async(productController.getProduct));
router.get('/', Async(productController.getAllProduct));
module.exports = router;