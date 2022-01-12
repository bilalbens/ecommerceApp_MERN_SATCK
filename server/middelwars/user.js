const User = require('../models/user')


exports.userById = (req,res,next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user ){
            return res.status(404).json({error: "user not found"})
        }

        req.profile = user;
        next();
    })
} 


exports.addproductToUserHistory = (req, res, next)=>{
    let history = [];
    history = req.body.products.map((product)=>{
        return{
            _id:product._id,
            name:product.name,
            description : product.description,
            quantity: product.quantity,
            amount: product.price * product.count,
            transact_id : req.body.transactionId
        }
    })



    if(history.length){
        User.findOneAndUpdate(
            {_id:req.profile._id},
            {$push: {history: history}},
            {new: true},
            (err, data)=>{
                if(err){
                    return res.status(404).json({error: "could not update user history !"})
                }
                
                return next()
            }
        )
    }

    next()
    
}