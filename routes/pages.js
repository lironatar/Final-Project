const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');


require("../Models/Category");
const Category = mongoose.model('category');

//const {globalApiLimiter} = require('../helper/limiter');
//var S = require('string');

router.get('/gallery', (req,res)=>{
    Category.findOne({title: 'ספרים'}).then(data =>{
    })
    Category.find({}).then(data =>{
        res.render('pages/gallery', {category:data} );
    })
});



router.get('/gallery/:title', (req,res)=>{
    Category.findOne({title:req.params.title}).then( category =>{
        Category.find({}).then(data=>{
            res.render('pages/products',{product:category, category:data});
        })
        
    })
})


module.exports = router;