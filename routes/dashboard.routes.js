
var express=require('express');
var router=express.Router();
var dashboardController=require('../controllers/dashboard.controller');

//route to get all the user listing

router.get('/dashboard',dashboardController.isLoggedIn,dashboardController.dashboard);
router.post('/search',dashboardController.isLoggedIn,dashboardController.search);

module.exports=router;