const UserController = require('../controllers/user')
const userController = new UserController()

//middleware
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../../../middlewares/v1/authorize')
const Async = require('../../../middlewares/v1/Asynchandler')


const express = require('express')
const router = express.Router();
//MYACCOUNT => PERSONAL DETAIL 
//UPDATE => USER AND ADMIN
//DELETE => USER AND ADMIN
//GET USER => ADMIN ONLY
//GET ALL USER / NEW USER => ADMIN ONLY
//USER STATUS => ADMIN ONLY 
//DELETED USER => ADMIN ONLY
router.post('/myAccount/:id',[verifyTokenAndAuthorization],Async(userController.myAccount))

router.put('/update/:id',[verifyTokenAndAuthorization],Async(userController.update))

router.delete('/delete/:id',[verifyTokenAndAuthorization],Async(userController.delete))

router.get('/getUser',[verifyTokenAndAdmin],Async(userController.getUser))

router.get('/getAllUser',[verifyTokenAndAdmin],Async(userController.getAllUser))

router.get('/status',[verifyTokenAndAdmin],Async(userController.status))

router.get('/deletedUser',[verifyTokenAndAdmin],Async(userController.deletedUser))



module.exports = router