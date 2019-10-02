const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const sanitize=require('mongo-sanitize');
const {SHA256} = require('crypto-js');
const {ensureAuth} = require('../helper/authtrue');

require('../Models/User');
const Users = mongoose.model('user');

router.get('',ensureAuth, (req,res)=>{
    res.render('users/changeName');
})
router.post('',ensureAuth, (req,res)=>{
    var password=sanitize(req.body.password); // current pass
    var newFname = sanitize(req.body.fname); // new first name request
    var newLname = sanitize(req.body.lname); // new last name request
    if (newLname.length <2){
        newLname = req.user.lname;
    }
    if (newFname.length<2){
        newFname = req.user.fname;
    }
    var errors=[];
    if (password.length < 4){
        errors.push({text: 'הסיסמה חייבת להיות 4 תווים לפחות'});
    }
    if (errors.length == 0){
        var password = SHA256(password).toString();
        Users.findOneAndUpdate({email: req.user.email, password:password}, {fname: newFname, lname: newLname}).then(data =>{
            if (data == null){
                console.log('error');
                req.flash('erorr', 'קראת טעות, מצטערים');
                res.render('users/profile',{error:error});
            }
            else{
                console.log('success');
                if (newFname == data.fname){
                    req.flash('success', 'שם משפחה שונה בהצלחה');
                    res.redirect('/profile');
                }
                else if (newLname == data.lname){
                    req.flash('success', 'שם פרטי שונה בהצלחה');
                    res.redirect('/profile');
                }
                else{
                req.flash('success','שם שונה בהצלחה');
                res.redirect('/profile');
            }}
        })
    }
    
    
});

module.exports = router;


