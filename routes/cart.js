const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');
const paypal = require('paypal-rest-sdk');


const globalHelper = require('../helper/globalHelpers');
router.get('', async(req,res) => {
    let cart = req.session.cart || {};
    let newCart = req.session.newCart = [];
    if (req.session.cart){
        newCart.push(cart);
        var finalPrice= 0;
        let priceArray =[];
        for (let i=0; i<newCart.length; i++){
            priceArray.push(newCart[i].price);
        }
        for (let i=0; i<priceArray.length; i++){
            finalPrice += priceArray[i];
            
        }
        if (req.user != undefined){
            finalPrice*=0.95;
        }
        //update cart
        req.session.newCart.finalPrice = finalPrice;
        req.session.cart.finalPrice= finalPrice;
        //Convert to string
        req.session.cart.finalPrice = await req.session.cart.finalPrice.toString();
        req.session.cart.price = await req.session.cart.price.toString();

        console.log('#############final price: ',cart);
    }
    console.log(finalPrice);
    let footer = await globalHelper.Footer();
    res.render('cart/index', {cart: newCart, category: footer, helpers:{
        cartIsFull: function(){
            if (finalPrice == undefined){
                return false;
            }
        },
        cartIsEmpty : function(){
            if(finalPrice == undefined){
                return true;
            }
        },
        totalPrice: function(){
            return finalPrice;
        },
        isUser: function(){
            if(req.user != undefined){
                return true
            }
            else{
                return false
            }
        }
        
    }});

})

//Paypal Route
const paypalConfig= require('../config/paypal.js');

paypal.configure({
    'mode': paypalConfig.mode, //sandbox or live
    'client_id': paypalConfig.client_id,
    'client_secret': paypalConfig.client_secret
});
router.post('/paypal', async(req,res)=>{
    let cart = await req.session.cart;
  
    const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url":paypalConfig.return_url, //"http://localhost:5000",
        "cancel_url": paypalConfig.cancel_url
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": cart.finalPrice,
                "currency": "ILS",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "ILS",
            "total": cart.finalPrice
        },
        "description": "This is the payment description."
    }]
};
 
 
paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        console.log(error);
        res.send(error)
    } else {
        for(let i=0; i<payment.links.length; i++){
            if(payment.links[i].rel === 'approval_url'){
                //req.flash('success', 'התשלום בוצע בהצלחה');
                res.redirect(payment.links[i].href)
            }
        }
    }
});

})
router.get('/paypal/success', (req,res)=>{
    const payerID= req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
        "payer_id" : payerID,
        "transactions": [{
            "amount": {
                "currency": "ILS",
                "total": req.session.cart.finalPrice
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment){
        if (error){
            console.log(error.response);
            throw error;
        }else{
            req.flash('success', 'התשלום בוצע בהצלחה');
            res.redirect('/');
        }
    })
});
module.exports= router;