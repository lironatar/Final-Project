
const moongose = require('mongoose');
const Schema= moongose.Schema;

//Create Schema
const CategorySchema = new Schema({
    title: {
        type:String,
        unique: true
    },
    pic: String,
    text: String
});
//mongoose.model('collection_name', Schema_name)
moongose.model('category', CategorySchema);