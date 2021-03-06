//Npms
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
const MongoStore = require('connect-mongo')(session);
//Load Routes
const login = require('./routes/login');
const register = require('./routes/register');
const contact_us = require('./routes/contact_us');
// Authintaction
const {ensureAuth} = require('./helper/authtrue');
const {alreadyAuth} = require('./helper/auth');
const {isAdmin} = require('./helper/admin');

//Limiters
const {apiLimiter} = require('./helper/limiter');
const {globalApiLimiter} = require('./helper/limiter');
//Profile Route
const profile = require('./routes/profileManagment');
//Products Routes
const store = require('./routes/products');
const cart = require('./routes/cart');
const adminRouter = require('./routes/adminBro');
// Load helpers
const globalHelper = require('./helper/globalHelpers');
//DB config 
const db = require('./config/db');

//Passport Config
require("./config/passport")(passport); 
//Requires the function from ./config/passport and then immediately pass passport npm from above

//Connect to MongoDB
mongoose.connect(db.mongoURI,
{ useUnifiedTopology:true ,useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
// DB dynmaic 

//Handlebars template enginer Middleware
// express-handlebars helpers
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout:'main',
    // Custom Helpers
    helpers:{
        calculation: function(value){
            return value
        }
    }
})

app.engine('handlebars', hbs.engine);
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
    secret: 'Huge secret!',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),//MongoStore saves session
    cookie: {maxAge: 60 * 60 *10000},
}));

//Passport and session configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());




// Flash Messages
app.use(function(req,res,next){
    //make sure you can always access it on every template
    //without needeing to pass it explicity
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.errors= req.flash('errors');
    res.locals.session = req.session; 
    res.locals.user = req.user || null; 
    next();
});


//Get Routes
app.get('',globalApiLimiter, async(req,res)=>{
    let data = await globalHelper.Footer();
    res.render('index', {category:data});
});
app.get('/about_us', globalApiLimiter, async (req,res)=>{
    let data = await globalHelper.Footer();
    res.render('pages/about_us', {category:data});
});



// Use Routes
app.use('/admin', ensureAuth, isAdmin, adminRouter);
app.use('/store', store, globalApiLimiter);
app.use('/cart', cart);
app.use('/login', login, apiLimiter, alreadyAuth);
app.use('/register', register, alreadyAuth, globalApiLimiter);
app.use('/contact_us', contact_us, globalApiLimiter);
app.use('/profile', profile, ensureAuth, globalApiLimiter);



const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('Logged in on port'+' '+ port);
});
