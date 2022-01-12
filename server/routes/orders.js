const express = require('express');
const {userById, addproductToUserHistory} = require('../middelwars/user');
const router = express.Router();
const {requireSignIn,isAuth, isAdmin}=require('../middelwars/auth')
const {decreaseQuantity} = require("../middelwars/product")

const {create,listOrders, getStatus, updateOrderStatus} = require('./../controllers/orderController')
const {orderById} =  require('../middelwars/order');

router.get("/status/:userId", [requireSignIn,isAuth, isAdmin], getStatus)
router.patch("/:orderId/status/:userId", [requireSignIn,isAuth, isAdmin], updateOrderStatus)
router.post('/create/:userId',[requireSignIn ,isAuth, addproductToUserHistory, decreaseQuantity],create)
router.get("/:userId", [requireSignIn,isAuth, isAdmin], listOrders)


router.param('orderId', orderById)
router.param('userId', userById)




module.exports = router