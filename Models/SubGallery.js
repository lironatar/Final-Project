const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubGallery = new Schema({
    pic: String,
    text: String, 
    title: String
})
mongoose.model('subGallery', SubGallery);