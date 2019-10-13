//A Custom function to export to use it globally at given.



module.exports ={
    NoAdmin: function(req ,res ,next){
        if ( req.isAuthenticated() == false){
            if (req.user.email == 'm44000@gmail.com'){
                return next();
            }
        }
        req.flash('error', 'לא להכנס לפה');
        res.redirect('/home');
    }
}