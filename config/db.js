if (process.env.NODE_ENV === "production"){
    module.exports = {mongoURI:
    "mongodb+srv://Liron:<5327158li>@dfusreuven-3resq.mongodb.net/test?retryWrites=true&w=majority"
    }
}else{
    module.exports = {mongoURI: "mongodb://localhost/DfusReuven"}
}