const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');
const paypal = require('paypal-rest-sdk');


const globalHelper = require('../helper/globalHelpers');
router.get('', async(req,res) => {
    let cart = req.session.cart || {};
    let newCart = req.session.newCart = [];
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
    newCart.finalPrice = await finalPrice;
    req.session.cart.finalPrice= await finalPrice ;
    //Convert to string
    req.session.cart.finalPrice = await req.session.cart.finalPrice.toString();
    req.session.cart.price = await req.session.cart.price.toString();

    console.log('#############final price: ',cart);
    let footer = await globalHelper.Footer();
    res.render('cart/index', {cart: newCart, category: footer, helpers:{
        cartIsEmpty: function(){
            if (Number.isNaN(finalPrice)){
                return false;
            }
            else{
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

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AexEfkr_JlNAiKiuzaBcd22q2i6lzg8rAfv1nPbG8qkRSQ6PM8JWfuMjFCR8hgcjyhmBIpb-1TY5e4nz',
    'client_secret': 'EHwUE3DSj6cXeVRVFadLBDaeDsqyA0VDlyzIpO6SgfB4SjQgVsn9p-ie5wDi8l9GqfZgM4P4XvhdFYKQ'
});
router.post('/paypal', async(req,res)=>{
    let cart = await req.session.cart;
  
    const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url":"http://localhost:5000/cart/paypal/success", //"http://localhost:5000",
        "cancel_url": "http://localhost:5000"
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