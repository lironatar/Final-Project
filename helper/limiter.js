const rateLimit = require("express-rate-limit");
var MongoStore = require('rate-limit-mongo');
var mongoURI = 'mongodb+srv://Liron:5327158@dfusreuven-3resq.mongodb.net/test?retryWrites=true&w=majority';
module.exports= {
    apiLimiter:new rateLimit({
        store: new MongoStore({
            uri:mongoURI,
            collectionName: 'LoginApiLimiter'
        }),
        windowMs: 7*60*1000,
        max:50,
        handler:function handler(req,res) {
            req.flash('error', 'אנא המתן לאחר שליחת דואר');
            res.redirect('/home');
        }
    }),
    postLimiter:new rateLimit({
        store: new MongoStore({
            uri:mongoURI,
            collectionName:'ContactusLimiter'
        }),
        windowMs: 7*60*1000,
        max:1,
        handler:function handler(req,res) {
            req.flash('error', ' אנא המתן 7 דקות לאחר שליחת דואר נוסף');
            res.redirect('/home');
        }
    }),
    loginPostLimiter: new rateLimit({
        store: new MongoStore({
            uri:mongoURI,
            collectionName:'LoginPostLimiter'
        }),
        windowMs: 10*60*1000,
        max:5,
        handler:function handler(req,res) {
            req.flash('error', 'מצטערים, ניסית יותר מדי פעמים, אנא המתן 10 דקות');
            res.redirect('/home');
        }
        
    }),
    globalApiLimiter:rateLimit({
        store: new MongoStore({
            uri:mongoURI,
            collectionName:'GlobalApiLimiter'
        }),
        windowMs:30*60*1000,
        max: 200
    })
}