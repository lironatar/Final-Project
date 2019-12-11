const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');


require('../Models/Gallery');
const Gallery = mongoose.model('gallery');
//For gallery Links in the main footer.
async function Footer(){
    let footer = await Gallery.find({});
    return footer;
}
module.exports.Footer = Footer;