
const moongose = require('mongoose');
const Schema= moongose.Schema;

//Create Schema
const ProductsSchema = new Schema({

    title: String,
    text: String,
    imageTitle: String,
    size: [{
        type:String
    }],
    cover: String,
    quantity: Array,
    price: Array,
    examplepics: [{
        type:String
    }]

})

moongose.model('products', ProductsSchema);