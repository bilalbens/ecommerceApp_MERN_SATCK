exports.userSignupValidator = (req,res,next)=>{
    
    req.check('name','Name is required').notEmpty();
    req.check('email','email is required')
       .notEmpty()
       .isEmail();
    
    req.check('password','password is required')
       .notEmpty()
       .isLength({min:6,max:10})
       .withMessage('Passwrod must be between 6 and 10 Caracters')
       
    const errors = req.validationErrors();

    if(errors)
    {
        return res.status(400).json({error:errors[0].msg})
    }

    next()
}