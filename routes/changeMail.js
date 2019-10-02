const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const sanitize=require('mongo-sanitize');
const {SHA256} = require('crypto-js');
const {ensureAuth} = require('../helper/authtrue');

require('../Models/User');
const Users = mongoose.model('user');

router.get('',ensureAuth, (req,res)=>{
    res.render('users/changeMail');
})
router.post('',ensureAuth, (req,res)=>{
    var password=sanitize(req.body.password); // current pass
    var newEmail = sanitize(req.body.email); // new email request
    var errors=[];
    if (password.length < 4){
        errors.push({text: 'הסיסמה חייבת להיות 4 תווים לפחות'});
    }
    if (newEmail.length<10){
        errors.push({text: 'המייל קצר'});
    }
    if (errors.length == 0){
        var password = SHA256(password).toString();
        Users.findOneAndUpdate({email: req.user.email, password:password}, {email:newEmail}).then(data =>{
            if (data == null){
                console.log('error');
                req.flash('erorr', 'קראת טעות, מצטערים');
                res.render('users/profile',{error:error});
            }
            else{
                console.log('success')
                req.flash('success', 'מייל שונה בהצלחה');
                res.redirect('/profile');
            }
        })
    }
    
    
});

module.exports = router;