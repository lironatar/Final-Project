module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){ //passport.js custom auth function
            return next(); //will return true
        }
        req.flash('error', 'גישה אסורה, אנא התחבר');
        res.redirect('/login');
    }
}