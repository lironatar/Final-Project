const express = require ('express');
const router = express.Router();
const passport=require('passport');
const {loginPostLimiter}= require('../helper/limiter');
const {alreadyAuth} = require('../helper/auth');

require("../Models/Gallery");
const globalHelper = require("../helper/globalHelpers");

router.get('',alreadyAuth,async (req,res)=>{
    var data = await globalHelper.Footer();
    res.render('users/login', {category:data})
});


router.post('',loginPostLimiter,alreadyAuth, (req,res, next)=>{
     //Instead of doing my own custom function, We will call
        //Passport.authenticate
    passport.authenticate('local', { // 'local'  is in config
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash: true,
        successFlash: true//req.flash('success_msg', `Welcome ${req.body.email}`)
        
    })(req, res, next);
     //will do it immediately   
});

module.exports = router;