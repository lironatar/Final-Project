const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');
const sanitize= require('mongo-sanitize');
const passport=require('passport');
const {SHA256} = require('crypto-js');
const{loginPostLimiter}= require('../helper/limiter');
const {apiLimiter} = require('../helper/limiter');
const {alreadyAuth} = require('../helper/auth');
require('../Models/User');
const User = mongoose.model('user');
router.get('',apiLimiter, (req,res)=>{  //the route is blank because it is already set to /login
    res.render('users/login');
})


router.post('',loginPostLimiter,alreadyAuth, (req,res, next)=>{
     //Instead of doing my own custom function, We will call
        //Passport.authenticate
    passport.authenticate('local', { // 'local'  is in config
        successRedirect:'/home',
        failureRedirect:'/login',
        failureFlash: true,
        successFlash: true//req.flash('success_msg', `Welcome ${req.body.email}`)
        
    })(req, res, next);
     //will do it immediately   
});

module.exports = router;