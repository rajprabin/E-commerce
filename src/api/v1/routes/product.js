const ProductController = require('../controllers/product')
const productController = new ProductController()

//middleware
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../../../middlewares/v1/authorize')
const Async = require('../../../middlewares/v1/Asynchandler')

const express = require('express')
const router = express.Router();

//CREATE => ADMIN
//UPDATE => ADMIN
//DELETE => ADMIN
//GET ONE PRODUCT => USER AND ADMIN 
//GET ALL PRODUCT => USER AND ADMIN
//unique product =>admin
//create product attribute => admin
//order product 
//order Item => user 
router.post('/create',[verifyTokenAndAdmin],Async(productController.create))

router.put('/update',[verifyTokenAndAdmin],Async(productController.update))

router.delete('/delete',[verifyTokenAndAdmin],Async(productController.delete))
// get single product BY TITLE
router.get('/get/:id',[verifyTokenAndAuthorization],Async(productController.getProduct))
    //available of all each product  and it count
router.get('/getAllProduct',[verifyTokenAndAdmin],Async(productController.getAllProduct))
//show unique
router.get('/getUniqueProduct',[verifyTokenAndAdmin],Async(productController.uniqueProduct))

//creating attribute
router.post('/productAttribute',[verifyTokenAndAdmin],Async(productController.productAttribute))

//for order purpose
router.post('/order',[verifyTokenAndAuthorization],Async(productController.orderItem))
module.exports = router