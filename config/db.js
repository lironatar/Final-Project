if (process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb+srv://Liron:5327158@dfusreuven-zvbh0.mongodb.net/test?retryWrites=true&w=majority'}
} else{
    console.log('Connected Locally');
    module.exports= {mongoURI: 'mongodb+srv://Liron:5327158@dfusreuven-3resq.mongodb.net/test?retryWrites=true&w=majority'}
}
