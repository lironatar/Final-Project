//A Custom function to export to use it globally at given.
const express = require('express');
const app= express();
const mongoose = require('mongoose');
require("../Models/User")
const User= mongoose.model('user');


module.exports ={
    isAdmin: function(req ,res ,next){
        if (req.isAuthenticated()){
            var email = req.user.email;
            var emailadmin= "m44000@gmail.com"
            User.findOne({email:emailadmin})
            if (req.user.email == "m44000@gmail.com"){
                return next();
            }
        }
        req.logOut();
        req.flash('error', ' Error');
        res.redirect('/home')
    }
}