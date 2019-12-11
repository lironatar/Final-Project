const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');


require("../Models/Gallery");
const Gallery = mongoose.model('gallery');
require("../Models/Products");
const Products = mongoose.model('products')
require("../Models/SubGallery");
const SubGallery = mongoose.model('subGallery');
//const {globalApiLimiter} = require('../helper/limiter');
//var S = require('string');

// Global Object 
MyObject = {
    //async - await function for footer categories
    footer : async function forall () {
        var footer = await Gallery.find({});
        return footer;
    }
}
router.get('/gallery',async (req,res)=>{
   //let footer = await forall();
   let footer = await MyObject.footer();
   let category = 
   res.render('pages/gallery', {category : footer}) 
});


router.get('/gallery/:title', async(req,res)=>{
    let footer = await MyObject.footer();
    try{
        let Images = await SubGallery.find({title:req.params.title});
        let title = Images[0].title;
        res.render('pages/categoryimages',{Images : Images, title:title, category : footer});
    }catch(err){
        let statusCode = '404'
        let errorText = 'מצטערים, כרגע אין מוצר'
        res.render('errors/errors',{statusCode:statusCode, errorText: errorText, category: footer})
    }
    
})
router.get('/products/:imageTitle', async (req,res)=>{
    let imageTitle = "פולדרים מגניבים"

    let product = await Products.findOne({imageTitle: req.params.imageTitle});
    let footer = await MyObject.footer();
    res.render('pages/products', {product:product, category: footer,
    helpers: {
        carousel : function() {
            let index = product.examplepics;
            let i=0;
            let indexArray =[]
            index.forEach(element => {
                i++;
                indexArray.push(i);
            });
            i--;
            return indexArray; 
        }
    }
    });
})



module.exports = router;