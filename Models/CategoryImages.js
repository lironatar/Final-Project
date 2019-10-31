const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryImages = new Schema({
    images: String,
    title: String,
    imageTitle: {type:String,unique:true},
    text: String,
    price: Number
})
mongoose.model('CategoryImages', CategoryImages);