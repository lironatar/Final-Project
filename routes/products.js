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
   let data = await MyObject.footer();
   res.render('pages/gallery', {category : data}) 
});


router.get('/gallery/:title', async(req,res)=>{
    let footer = await MyObject.footer();
    try{
        let sub = await SubGallery.find({galleryTitle:req.params.title});
        let title = sub[0].title;
        res.render('pages/categoryImages',{Images : sub, title:title, category : footer});
    }catch(err){
        let statusCode = '404'
        let errorText = 'מצטערים, כרגע אין מוצר'
        res.render('errors/errors',{statusCode:statusCode, errorText: errorText, category: footer})
    }
    
})
router.get('/products/:subGalleryTitle', async (req,res)=>{

    let product = await Products.findOne({subGalleryTitle: req.params.subGalleryTitle});
    let footer = await MyObject.footer();
    let activePic = product.mainPic;
    res.render('pages/products', {product:product, category: footer, activePic:activePic,
    helpers: {
        carousel : function() {
            let index = product.pics;
            let i=0;
            let indexArray =[]
            index.forEach(element => {
                indexArray.push(i);
            });
            
            
            return indexArray; 
        }
    }
    });
})

router.post('/products/:subGalleryTitle', async(req,res)=>{
    req.body.quantity = await parseInt(req.body.quantity);
    req.body.price = await parseInt(req.body.price);
    req.session.cart = req.body;
    res.redirect('/cart');
})

module.exports = router;