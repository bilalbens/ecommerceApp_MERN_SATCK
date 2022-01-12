const express = require('express');
const {requireSignIn,isAuth, isAdmin}=require('../middelwars/auth')
const {userById} = require('../middelwars/user');
const {createProduct,
    showProduct,
    productById,
    deleteProduct,
    updateProduct,
    allProducts,
    relatedProducts,
    searchProduct,
    photoProduct
} = require('../controllers/productController')



const router = express.Router();

router.get('/', allProducts)

router.post('/create/:userId',[requireSignIn ,isAuth,isAdmin ],createProduct)

router.get('/related/:productId', relatedProducts)

router.get('/:productId', showProduct)

router.get('/photo/:productId', photoProduct)

router.delete('/:productId/:userId',[requireSignIn ,isAuth,isAdmin ], deleteProduct)

router.put('/:productId/:userId',[requireSignIn ,isAuth,isAdmin ], updateProduct)

router.post('/search', searchProduct)



router.param('userId', userById)
router.param('productId', productById)


module.exports = router