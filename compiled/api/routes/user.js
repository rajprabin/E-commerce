"use strict";

const UserController = require('../../api/routes/controllers/user');

const userController = new UserController(); //middleware

const Async = require('../../middlewares/validations/Asynchandler');

const express = require('express');

const router = express.Router(); //UPDATE => USER AND ADMIN
//DELETE =. USER AND ADMIN
//GET USER => ADMIN ONLY
//GET ALL USER / NEW USER => ADMIN ONLY
//USER STATUS => ADMIN ONLY 

router.put('/', Async(userController.update));
router.delete('/', Async(userController.delete));
router.get('/', Async(userController.getUser));
router.get('/', Async(userController.getAllUser));
router.get('/', Async(userController.status));
module.exports = router;