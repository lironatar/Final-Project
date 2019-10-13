
const moongose = require('mongoose');
const Schema= moongose.Schema;

//Create Schema
const ProductsSchema = new Schema({

    title: String,
    text: String,
    size: String,
    cover: String,
    quanitity: Number,
    price: Number,
    examplepics: String

})

moongose.model('products', ProductsSchema);