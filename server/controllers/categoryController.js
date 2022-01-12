const Category = require('../models/category');
const _ = require("lodash")



exports.createCategory = (req, res)=>{
    const category = new Category(req.body);

    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"bad request"
            })
        }

        res.json({
            category:category
        })
    })
}

exports.categoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err || !category){
            return res.status(404).json({
                error:"catgeory not found"
            })
        }

        req.category = category
        next();
    })
}

exports.showCategory = (req,res)=>{
    res.json({
        category:req.category
    })
}



exports.allCategory = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(505).json({
                error: err
            })
        }

        res.json({
            categories
        })
    })
}


exports.updateCategory = (req,res)=>{
    let category = req.category;

    category = _.extend(category,req.body)
    // or 
    // category.name = req.body.name 

    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"category not updated"
            })
        }

        res.json({
            category:category
        })
    })
}

exports.removeCategory = (req,res)=>{
    let category = req.category
    category.remove((err,category)=>{
        if(err){
                return res.status(404).json({
                    error:"category not found"
                })
        }

        res.status(204).json({})
    })
}