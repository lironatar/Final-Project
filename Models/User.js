
const moongose = require('mongoose');
const Schema= moongose.Schema;

//Create Schema
const UserSchema = new Schema({

    fname:{
        type: String,
        required: true,
        lowercase: true,
        min:2,
        max:25
    },
    lname:{
        type: String,
        min:2,
        max:25,
        required:false
    },
    email:{
        type:String,
        required: true,
        unique: true,
        max:55,
    },
    password:{
        type:String,
        required: true,
        unique: false,
        max:255
    },
    date:{
        type:Date,
        default: Date.now
    }
})

moongose.model('user', UserSchema);