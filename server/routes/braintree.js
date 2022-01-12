const express = require('express');
const {userById} = require('../middelwars/user');
const router = express.Router();

const {generateToken, processPayement} = require('./../controllers/braintreeController')

const {requireSignIn,isAuth, isAdmin}=require('../middelwars/auth')


router.get('/getToken/:userId',[requireSignIn ,isAuth ],generateToken)
router.post('/purchase/:userId',[requireSignIn ,isAuth ],processPayement)


router.param('userId', userById)


module.exports = router