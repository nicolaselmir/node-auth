const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const FacebookStrategy = require('passport-facebook');
const config = require('../config/keys')

const User = require('../models/user');

module.exports = function(passport){

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({usernameField:'email'}, (email, password, done) => {
    User.findOne({email:email})
     .then( user => {
       if(!user){
         done(null, false, {message:"That email is not registered"})
       }

       bcrypt.compare(password, user.password, (err, isMatch) => {
         if(err) throw err;

         if(isMatch){
           return done(null, user)
         }else{
           return done(null, false, {message:"password incorrect"})
         }
       })
     })
     .catch(err => console.log(err));
  })
);

passport.use(new JWTStrategy({
  jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey:config.authSecret
}, async (payload, done) => {
  try {
    const user = await User.findById(payload._id)
    if(!user){
      done(null,false);
    }
    done(null, user);
  } catch(error){
    done(error, false)
  }
}));

}
