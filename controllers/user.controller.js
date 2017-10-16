var app = require('../app.js');
var Person = require('../models/user.model');
var db = require('../config/db.js');
var bcrypt = require('bcrypt');
var modellist = db.modelList;



//method to get list of all the users
exports.getUsers = function (req, res) {
    modellist.User.find({}, function (err, user) {
        if (err) {
            console.log("====error===");
            console.log(err);
        }
        console.log(user);
        return res.render('userListing', { data: user });
    });
}

//method to show the create user screen
exports.getCreateUser = function (req, res) {
    return res.render('register', { sucess: true, message: '' });
}


//method to create user and save into database
exports.createUser = function (req, res) {
   
    if (req.body.name != "" && req.body.email != "" && req.body.age != "" && req.body.password != "") {

        if (!validateEmail(req.body.email)) {
            return res.render('register', { sucess: false, message: 'please provide valid email ID' });
        }


        //to generate salt
        var salt = bcrypt.genSaltSync(10);
        // Hash the password with the salt
        var hash = bcrypt.hashSync(req.body.password, salt);
        //save this password as hash into database
        var password = hash;
        var name = req.body.name;
        var email = req.body.email;
        var age = req.body.age;



        var newuser = { 'name': name, 'email': email, 'age': age, 'password': hash }; //creating newuser object to save
        modellist.User.create(newuser, function (err) {
            if (err) {
                console.log("error in creating Person");
                console.log(err);
            }
            else {
                console.log("person created");
                return res.render('register', { data: 'done', created:true ,message:'Sucessfully Added User'});
            }

        });
    }
    else {
        res.render('register', { sucess: false, message: 'please fill all the fields' });
    }



}




/*
function to validate email
*/
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

