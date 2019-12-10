const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const sanitize=require('mongo-sanitize');
const {SHA256} = require('crypto-js');
const {ensureAuth} = require('../helper/authtrue');

require('../Models/User');
const Users = mongoose.model('user');
const Footer = require('../helper/footer');

// Profile
router.get('', ensureAuth,async (req, res)=>{
    footerProducts = await Footer.Footer();
    res.render('users/profile', {category: footerProducts})
})
// Change Mail
router.get('/changeMail',ensureAuth, async(req,res)=>{
    footerProducts = await Footer.Footer();
    res.render('users/changeMail', {category: footerProducts});
})
// Change Name
router.get('/changeName', ensureAuth, async(req,res)=>{
    footerProducts = await Footer.Footer();
    res.render('users/changeName', {category: footerProducts});
});
// Change Pass
router.get('/changePass', ensureAuth, async(req,res)=>{
    footerProducts = await Footer.Footer();
    res.render('users/changePass', {category: footerProducts});
})

// Email Managment
router.post('/changeMail',ensureAuth, async(req,res)=>{
    let password=sanitize(req.body.password); // current pass
    let newEmail = sanitize(req.body.email); // new email request
    let errors=[];
    if (password.length < 4){
        errors.push({text: 'הסיסמה חייבת להיות 4 תווים לפחות'});
    }
    if (newEmail.length<10){
        errors.push({text: 'המייל קצר'});
    }
    if (errors.length == 0){
        password = SHA256(password).toString();
        Users.findOneAndUpdate({email: req.user.email, password:password}, {email:newEmail}, function (err, data){
            if (err){
                if(err.name ==='MongoError' && err.code === 11000){
                    console.log("Duplicate Key Error");
                    req.flash('error', 'אימייל כבר קיים במערכת, אנא השתמש באימייל אחר');
                    res.render('users/changeMail',{error:error});
                }
                req.flash('error', 'משהו השתבש, עמכם הסליחה');
                res.render('users/profile', {error: error});
            }else{
                console.log('success')
                req.flash('success', 'מייל שונה בהצלחה');
                res.redirect('/profile');
            }
        })}
});
// Name Managment
router.post('/changeName',ensureAuth, (req,res)=>{
    let password=sanitize(req.body.password); // current pass
    let newFname = sanitize(req.body.fname); // new first name request
    let newLname = sanitize(req.body.lname); // new last name request
    if (newLname.length <2){
        newLname = req.user.lname;
    }
    if (newFname.length<2){
        newFname = req.user.fname;
    }
    let errors=[];
    if (password.length < 4){
        errors.push({text: 'הסיסמה חייבת להיות 4 תווים לפחות'});
    }
    if (errors.length == 0){
        password = SHA256(password).toString();
        Users.findOneAndUpdate({email: req.user.email, password:password}, {fname: newFname, lname: newLname}).then(data =>{
            if (data == null){
                console.log('error');
                req.flash('errrr', 'קראת טעות, מצטערים');
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

// Pass Managment
router.post('/ChangePass',ensureAuth, (req,res)=>{    
    let password=sanitize((req.body.password)); // old pass
    let newPass = sanitize((req.body.newPassword)); // new pass
    let confirmPass= sanitize((req.body.confirmNewPassword)); // new pass confirm
    let passwordOld= SHA256(password).toString(); // old pass sanitized and hashed
    
    let errors =[];
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
        newPass = SHA256(newPass).toString(); // hash the new pass
        Users.findOneAndUpdate({email:req.user.email} ,{password: newPass}, {new:true}).then(data =>{
            if (data == null)
            {
                req.flash('error', 'נוצרה טעות, מצטערים');
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

//Logout Route
router.get('/logout', (req,res)=>{
    req.logOut();
    req.flash('success', 'התנתקת בהצלחה');
    res.redirect('/');
})

module.exports = router;