//A Custom function to export to use it globally at given.

module.exports ={
    alreadyAuth: function(req ,res ,next){
        if (req.isAuthenticated() == false){
            return next();
        }
        req.flash('error', 'אתה כבר מחובר לאתר');
        res.redirect('/home');
    }
}