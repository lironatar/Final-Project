const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');


require('../Models/Category');
const Category = mongoose.model('category');

async function Footer(){
    let footer = await Category.find({});
    return footer;
}
module.exports.Footer = Footer;