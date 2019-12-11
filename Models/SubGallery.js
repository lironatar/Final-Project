const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubGallery = new Schema({
    pic: String,
    text: String, 
    title: String,
    galleryTitle: String
})
mongoose.model('subGallery', SubGallery);