// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db.js');
var modellist = db.modelList;
// load up the user model
var User = require('../models/user.model');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        modellist.User.find(id,1, function (err, user) {
            done(err, user[0]);
        });
    });
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists

            modellist.User.find({ 'email': email }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (user.length == 0)
                    return done(null, false, { message: 'No user found.' }); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                else if (user[0]) {
                    var user = user[0];
                    if (!comparePassword(req.body.password, user.password)) {
                        return done(null, false, { message: 'Oops! Wrong password.' }); // create the loginMessage and save it to session as flashdata
                    }
                    // all is well, return successful user
                    else {
                        return done(null, user);
                    }
                }
            });


        }));

};


//function to compare password
function comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);

}
