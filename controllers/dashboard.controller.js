var app = require('../app.js');
var db = require('../config/db.js');
var bcrypt = require('bcrypt');
var modellist = db.modelList;
var orm=require('orm')



//method to get list of all the users
exports.dashboard = function (req,res) {
   
    var user=req.user;
    console.log(req.user);
    modellist.Product.find({}, function (err, products) {
        if (err) {
            console.log("====error===");
            console.log(err);
        }
        if(products.length==0){
            return res.render('dashboard', {products:false,data:user });
        }
        else{

        
        return res.render('dashboard', { products:products,data:user });
        }
    });


}

exports.search = function (req,res) {
    var searchText=req.body.searchText;
    if(searchText ==undefined){
       var query={};
    }else{
        var query={name: orm.like("%"+searchText+"%") };
    }
    
     var user=req.user;
     
     modellist.Product.find(query, function (err, products) {
         if (err) {
             console.log("====error===");
             console.log(err);
         }
         if(products.length==0){
            //console.log("=======");
            // console.log(products);
             return res.render('dashboard', {products:false,data:user });
         }
         else{
         return res.render('dashboard', { products:products,data:user });
         }
     });
 
 
 }





//middleware function to check is user is logged in or not
exports.isLoggedIn=function(req, res, next) {
    
        // if user is authenticated in the session, carry on 
        console.log(req.isAuthenticated());
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }