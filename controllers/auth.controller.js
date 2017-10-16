var app = require('../app.js');
var Person = require('../models/user.model');
var db = require('../config/db.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var modellist = db.modelList;

//method to show the login screen
exports.getlogin = function (req, res) {
    return res.render('login', { sucess: true, message: '' });
}

//method to authenticate user and make him login
exports.login = function (req, res) {

    if (validateEmail(req.body.email)) {
        query = { 'email': req.body.email }
    }

    else {
        return res.render('login', { sucess: false, message: 'please provide valid email ID' });
    }


    modellist.User.find(query, 1, function (err, user) {

        if (err) {
            console.log("error in login user.find");
            console.log(err);
        }
        if (user.length == 0) {
            return res.render('login', { sucess: false, message: 'User does not exists' });
        }
        else if (user[0]) {
            var user = user[0];
            if (!comparePassword(req.body.password, user.password)) {
                return res.render('login', { sucess: false, message: 'Authentication Failed' });
            }
            else {

                req.login(user, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        // Remove sensitive data before return authenticated user
                        user.password = undefined;
                        res.redirect('/dashboard');
                        // return res.render('dashboard', { sucess: true, data:user, message: 'Authenticated Sucessfully' });

                    }
                });
            }
        }
    });

}

/*
* function to sign out user from the application
*/
exports.logout = function (req, res) {
    req.logout();//so that the user object will be destroyed from req
    req.user=null;
    console.log(req.user);
    res.redirect('/login');

}

/*
function to validate email
*/
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



/*
function to compare password
*/
function comparePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);

}

