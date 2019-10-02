const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const path= require('path');
const mongoose= require('mongoose');
const methodOverride= require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const rateLimit = require("express-rate-limit");
//Load Routes
const pages = require('./routes/pages');
const login = require('./routes/login');
const register = require('./routes/register');
const contact_us = require('./routes/contact_us');
const about_us = require('./routes/about_us');
// Authintaction
const {ensureAuth} = require('./helper/authtrue');
const {alreadyAuth} = require('./helper/auth');
//Limiters
const {apiLimiter} = require('./helper/limiter');
const {globalApiLimiter} = require('./helper/limiter');
//Profile Routes
const changeName= require('./routes/changeName');
const changePass= require('./routes/changePass');
const changeMail = require('./routes/changeMail');
//Limit access

//DB config 
const db = require('./config/db');

//Passport Config
require("./config/passport")(passport); 
//Requires the function from ./config/passport and then immediately pass passport npm from above

//Connect to MongoDB
mongoose.connect(db.mongoURI,
{useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

//Handlebars template enginer Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Use middlewares - parse request's body to json:
// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());

// Public folder
app.use(express.static(path.join(__dirname, 'layout')));

//Method Override middleware
app.use(methodOverride('_method'));


// Express Session
app.use(session({
    secret: 'sod',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
}));

//Passport and session configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());



// Flash Messages
app.use(function(req,res,next){
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.errors= req.flash('errors');
    res.locals.user = req.user || null;
    next();
});


//Get Routes
app.get('/home',globalApiLimiter, (req,res)=>{
    res.render('index');
});

app.get('/profile',ensureAuth, (req,res)=>{
    res.render('users/profile');
});
app.get('/pages/gallery',globalApiLimiter,(req,res)=>{
    res.render('pages/gallery');
})

// Use Routes
app.use('/pages', pages,globalApiLimiter);
app.use('/login', login,apiLimiter,alreadyAuth);
app.use('/register', register,alreadyAuth, globalApiLimiter);
app.use('/pages/contact_us', contact_us,globalApiLimiter);
app.use('/pages/about_us', about_us,globalApiLimiter);
app.use('/profile/changeName', changeName, ensureAuth);
app.use('/profile/changePass', changePass,ensureAuth);
app.use('/profile/changeMail',  changeMail,ensureAuth);

//Logout Route
app.get('/logout', (req,res)=>{
    req.logOut();
    req.flash('success', 'התנתקת בהצלחה');
    res.redirect('/home');
})
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('Logged in on port'+' '+ port);
});
