var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var session      = require('express-session');
var users = require('./routes/user.routes.js');
var auth = require('./routes/auth.routes.js');
var dashboard=require('./routes/dashboard.routes.js');

// var db=require('./models/index');
//var person=require('./models/user.model');
var db = require('./config/db.js');
require('./config/passport')(passport);

//for datbase connectivity to mysql
db.connect(function (err, dbconnection) {
    if (err) {
        console.log("database not connected");
    }
    else {
        console.log("db connected");
    }
});



var app = express();


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));

// required for passport
app.use(session({ secret: 'valarmorghulis' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// middleware to check 404 error
app.use(function (req, res, next) {
    console.log(req.path);
   
    var _ = require('underscore')
        , nonSecurePaths = ['/register', '/login','/search', '/dashboard' ,'/logout','/']; //those routes which are not going through jwt auth

    if (_.contains(nonSecurePaths, req.path)) {
        return next();
    }

    if (!req.User) {
        res.render('unauthorized');
    }
    else {
        next();
    }

});


app.get('/', function (req, res) {
    return res.render('login',{ sucess: true, message: '' });
})


app.use('/', users);
app.use('/', auth);
app.use('/', dashboard);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
    console.log("server started on port", + app.get('port'));
});



module.exports = app;