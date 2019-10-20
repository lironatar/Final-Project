
const moongose = require('mongoose');
const Schema= moongose.Schema;

//Create Schema
const ProductsSchema = new Schema({

    title: String,
    text: String,
    size: Array,
    cover: String,
    quantity: Array,
    price: Array,
    examplepics: String

})

moongose.model('products', ProductsSchema);