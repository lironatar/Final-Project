
const moongose = require('mongoose');
const Schema= moongose.Schema;

//Create Schema
const ProductsSchema = new Schema({

    title: String,
    quantity: Array,
    type: [String]


})

moongose.model('products', ProductsSchema);