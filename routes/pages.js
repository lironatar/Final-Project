const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');


require("../Models/Category");
const Category = mongoose.model('category');
require("../Models/Products");
const Products = mongoose.model('products')
//const {globalApiLimiter} = require('../helper/limiter');
//var S = require('string');

router.get('/gallery', (req,res)=>{
    Category.find({}).then(data =>{
        res.render('pages/gallery', {category:data} );
    })
});



router.get('/gallery/:title', (req,res)=>{
    Products.findOne({title:req.params.title}).then( product =>{
        res.render('pages/products', {product:product});
    })
})


module.exports = router;