const express = require('express');
const {userSignupValidator} = require('../middelwars/userValidator')
const {salam,signup,signin,signout} = require('../controllers/authController')
const {requireSignIn} = require('../middelwars/auth')


const router = express.Router();

router.get('/',salam)
router.post('/signup',userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)
router.get('/hello',requireSignIn, (req,res)=>{
    res.send('hello there')
})




module.exports = router;