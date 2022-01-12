const {Order} = require('./../models/order')

exports.create = (req,res)=>{
    req.body = {
        ...req.body,
        user:req.profile
    }

    const order = new Order(req.body)
    
    order.save((err,data)=>{
        if(err){
            return res.status(404).json({error: err.message})
        }
        
        return res.json(data);
        
    })

}


exports.listOrders = (req, res)=>{
    Order.find()
         .populate("user", "_id name email")
         .sort("-creatAt")
         .exec((err, orders)=>{
             if(err){
                 return res.status(404).json({error:err.message})
             }
             res.json(orders)
         })
}


exports.getStatus = (req, res)=>{
     res.json({status: Order.schema.path('status').enumValues})
}


exports.updateOrderStatus = (req, res)=>{
    Order.updateOne(
        {_id:req.order._id},
        {$set:{status: req.body.status}},
        (err,data)=>{
            if(err){
                return res.status(404).json({error: err.message})
            }
            res.json(data)
        }
    )
}