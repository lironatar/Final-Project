const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {SHA256} =require('crypto-js');
const sanitize= require('mongo-sanitize'); // removes $ at the begining of a string
const mongoose= require('mongoose');


const User = mongoose.model('user');
module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
    email = sanitize(email);
    password = sanitize(password);
    User.findOne({ email: email }).then(user => {
      if (user != null) {
        passwordEncrypted = SHA256(password).toString();
        if (user.password == passwordEncrypted) {
          return done(null, user, { message: `שלום ${user.fname}` });
        }
        else {
          return done(null, false, { message: 'סיסמה לא נכונה' });
        }
      }
      else {
        return done(null, false, { message: 'אימייל לא קיים במערכת' });
      }
    })
  }))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
}