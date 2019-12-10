const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');


require("../Models/Category");
const Category = mongoose.model('category');
require("../Models/Products");
const Products = mongoose.model('products')

class Cart {
    constructor(){
        this.data = {};
        this.data.items =[];
        this.data.totals = 0;
    }
}



module.exports= router;