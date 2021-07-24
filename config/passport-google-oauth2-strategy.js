const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');


// tell passport to use a new strrategy for google login
passport.use(new googleStrategy({
    clientID: "206926849437-r5ks9bv42d0t1kbb5f1jl8p0arnkstp8.apps.googleusercontent.com",
    clientSecret: "1IrRIW6H4y0KQ0GuJ5-iF1kT",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){

    if(err){ console.log("error in google strategy-passport", err); return; }

    console.log(profile);

    if(user){
        // if found set this user as req.user
        return done(null, user)
    }else{
        // if not found then set the user as req.user
        User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex')
        }, function(err, user){
            if(err){console.log("error in creating user", err); return;}

            return done(null, user);
        }
        )
    }
    })
}



));

module.exports = passport;



