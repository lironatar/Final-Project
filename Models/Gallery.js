
const moongose = require('mongoose');
const Schema= moongose.Schema;

//Create Schema
const GallerySchema = new Schema({
    pic: String,
    text: String,
    galleryTitle: String,
});
//mongoose.model('collection_name', Schema_name)
moongose.model('gallery', GallerySchema);