
const moongose = require('mongoose');
const Schema= moongose.Schema;

//Create Schema
const ProductsSchema = new Schema({
    subGalleryTitle: String,
    title: String,
    quantity: Array,
    size:[String],
    options:[String],
    mainPic:String,
    pics: [String],
    price: Number
})

moongose.model('products', ProductsSchema);