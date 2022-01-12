const Product = require('../models/product')

exports.decreaseQuantity = (req, res, next)=>{
    let bulkOps = req.body.products.map((product)=>{
        return{
            updateOne:{
                filter: {_id: product._id},
                update: { $inc: {quantity: -product.count, sold: +product.count}}
            }
        }
    })

    Product.bulkWrite(bulkOps, (err, products)=>{
        if(err){
            return res.status(404).json({error: "could not updaur Product !"})
        }

        next();
    })




}