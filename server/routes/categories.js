const express = require('express');
const {createCategory,categoryById,showCategory,allCategory,updateCategory,removeCategory} = require('../controllers/categoryController')
const {requireSignIn,isAuth, isAdmin}=require('../middelwars/auth')
const {userById} = require('../middelwars/user');



const router = express.Router();

router.get('/', allCategory)
router.post('/create/:userId',[requireSignIn ,isAuth,isAdmin ],createCategory)
router.put('/:categoryId/:userId',[requireSignIn ,isAuth,isAdmin ],updateCategory)
router.delete('/:categoryId/:userId',[requireSignIn ,isAuth,isAdmin ],removeCategory)
router.get('/:categoryId', showCategory)


router.param('userId', userById)
router.param('categoryId',categoryById)



module.exports = router