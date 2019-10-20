//A Custom function to export to use it globally at given.



module.exports ={
    NoAdmin: function(req ,res ,next){
        if (req.user.email == 'm44000@gmail.com'){
            res.redirect('/admin');
        }
        else{
            return next();
        }
    }
}