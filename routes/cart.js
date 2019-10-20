const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');


require("../Models/Category");
const Category = mongoose.model('category');
require("../Models/Products");
const Products = mongoose.model('products')

router.get('', (req,res)=>{
    //get cart from session
    req.session.views++;
    console.log(req.session.views);
    
    var cart= req.session.cart;
    var displayCart ={items: [], total: 0};
    var total= 0;
    //get total
    for(var item in cart){
        displayCart.items.push(cart[item]);
        total += (cart[item].qty * cart[item].price);
    }
    displayCart.total= total;
    //render Cart
    res.render('cart/index',{
        cart:displayCart
    })
});
router.post('/:id', (req,res)=>{
    req.session.cart = req.session.cart || {};
    var cart= req.session.cart;
    
})



module.exports= router;