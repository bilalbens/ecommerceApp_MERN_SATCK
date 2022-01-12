const expressJwt = require('express-jwt');
require('dotenv').config();


exports.requireSignIn = expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
})



exports.isAuth = (req,res,next)=>{
    let user = req.profile && req.auth && (req.profile._id ==req.auth._id )

    if(!user){
        return res.status(403).json({
            error:"Acces Denied"
        })
    }

    next();
}

exports.isAdmin = (req,res,next)=>{
    if(req.auth.role == 0){
        return res.status(403).json({
            error:"Admin Resource, Acess Denied"
        })
    }

    next();

}
