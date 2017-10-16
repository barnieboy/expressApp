//this file will contains database related configurations 

var orm = require('orm');
//to get usermodel from models/user.model
var UserSchema = require('../models/user.model');
//to get productmodel from models/product.model
var ProductSchema = require('../models/product.model');
//this will contain the list of all the mode
var modelList = {};
var opts = {
        host: '127.0.0.1',
        database:'ormdb',
        protocol: 'mysql',
        port: '3306',
        username: 'root',
        password: "root",
        query: { pool: true }
};


//okfunction to connect to mysql database using orm method connectAsync
exports.connect = function (callback) {

        orm.connectAsync(opts)
                .then(function (db) {

                        //after sucessfull connection registering all models
                        var User = db.define('user', UserSchema);
                        var Product = db.define('product', ProductSchema);


                        modelList.User = User; //associating User model to the modelList object
                        modelList.Product = Product //associating product model to the modelList object
                        callback(null, db);

                })
                .catch(function (err) {
                        console.error('Connection error: ' + err);
                        callback(err, null);
                });

}



exports.modelList = modelList








