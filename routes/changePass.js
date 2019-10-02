const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const sanitize=require('mongo-sanitize');
const {SHA256} = require('crypto-js');
const {ensureAuth} = require('../helper/authtrue');

require('../Models/User');
const Users = mongoose.model('user');

router.get('',ensureAuth, (req,res)=>{
    res.render('users/changePass');
});

router.post('',ensureAuth, (req,res)=>{
    
    var password=sanitize((req.body.password)); // old pass
    var newPass = sanitize((req.body.newPassword)); // new pass
    var confirmPass= sanitize((req.body.confirmNewPassword)); // new pass confirm
    var passwordOld= SHA256(password).toString(); // old pass sanitized and hashed
    
    var errors =[];
    if(passwordOld != req.user.password){ // if old pass sanitized and hashed != users hashed password
        errors.push({text: 'סיסמה נוכחית אינה נכונה'});
    }
    if (newPass != confirmPass){ // if new pass and confirm pass not equal
        errors.push({text: 'סיסמה חדשה ואישור סיסמה אינם תואמים'});
    }
    if (newPass.length < 4 || confirmPass < 4 ){
        errors.push({text: 'סיסמה ואישור סיסמה חייבים לפחות 4 תווים'});
    }
    if (errors.length == 0){ // if no errors, procced
        var newPass = SHA256(newPass).toString(); // hash the new pass
        Users.findOneAndUpdate({email:req.user.email} ,{password: newPass}, {new:true}).then(data =>{
            if (data == null)
            {
                req.flash('erorr', 'נוצרה טעות, מצטערים');
                console.log('error');
                
                res.render('users/profile');
            }
            else{
                console.log('success')
                req.flash('success', 'סיסמה שונתה בהצלחה!');
                
                res.redirect('/profile');
            }
        }) 
        //A.findOneAndUpdate(conditions, update, options, callback) // executes
    } else{
        req.flash('errors', '');
        res.render('users/changePass',{
            errors:errors
        });
    }
    
});
module.exports=router;