const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubGallery = new Schema({
    galleryTitle: String,
    pic: String,
    text: String, 
    subGalleryTitle: String
})
mongoose.model('subGallery', SubGallery);