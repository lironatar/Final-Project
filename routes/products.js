const express = require ('express');
const router = express.Router();
const mongoose= require('mongoose');

require("../Models/Category");
const Category = mongoose.model('category');






module.exports = router;