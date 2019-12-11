

module.exports ={
    isAdmin: function(req ,res ,next){
        if (req.isAuthenticated()){
            if (req.user.email == "m44000@gmail.com"){
                return next();
            }
        }
        req.logOut();
        req.flash('error', ' Error');
        res.redirect('/home')
    }
}