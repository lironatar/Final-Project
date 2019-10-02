const express = require ('express');
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const my_secret ='My Little Secret';
const passport=require('passport');
const {SHA256} = require('crypto-js');
const sanitize= require('mongo-sanitize');
const router = express.Router();
const {alreadyAuth} = require('../helper/auth');

router.get('', (req,res)=>{
    res.render('users/register'); 
});

//Load User Schema
require("../Models/User")
const User= mongoose.model('user');

router.post('',alreadyAuth, (req, res, next)=>{
    let fname =sanitize( req.body.fname); //sanitize strips out any keys that start with '$' in the input
    let lname= sanitize(req.body.lname);
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);
    const confirm_password = sanitize(req.body.confirm_password);
    const errors= [];
    if (fname.length <2 || fname.length >10)
        {errors.push({text: 'שם פרטי צריך להיות בין 2 - 10 תווים'})}
    if (lname.lgenth <2 || lname.length > 10)
        {errors.push({text: 'שם משפחה צריך להיות בין 2 - 10 תווים'})}
    if (password != confirm_password)
        {errors.push({text:'סיסמה ואישור סיסמה אינן תואמות'})}
    if (password.length <2 || password.length > 55)
        {errors.push({text: "סיסמה קצרה"})}
    if (email.length <10){ errors.push({text: "אימייל קצר מדי"})}
    if (errors.length>0){
        console.log(errors);
        req.flash('errors', '');
        res.render('users/register',{
            errors:errors,
            fname:fname,
            lname:lname,
            email:email,
        })

    } else{
        User.findOne({email: email}).then(exist =>{
            if(exist == null){
                const userDb= {
                    fname:fname,
                    lname:lname,
                    email:email,
                    password:SHA256(password).toString()
                }
                new User(userDb).save();
                req.flash('success', 'נרשמת בהצלחה!');
                res.redirect('/login');
            }else{
                errors.push({text: "אימייל כבר קיים במערכת, אנא השמתמש באימייל אחר"});
                req.flash('errors', ' ');
                res.render('users/register', {
                    errors:errors,
                    fname:fname,
                    lname:lname,
                    email:email
                })
            }
        })
        
    }
    
})

module.exports= router