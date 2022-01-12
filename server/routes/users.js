const express = require('express');
const {getOneUser,updateOneUser} = require('../controllers/userController');
const {userById} = require('../middelwars/user');
const {requireSignIn,isAuth, isAdmin}=require('../middelwars/auth')

const router = express.Router();


router.get('/profile/:userId',requireSignIn,isAuth,isAdmin,getOneUser);

router.put('/profile/:userId',updateOneUser);

router.param('userId', userById)


module.exports = router