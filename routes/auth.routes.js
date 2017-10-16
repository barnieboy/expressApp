
var express=require('express');
var router=express.Router();
var userController=require('../controllers/auth.controller');

//route to get all the user listing

router.get('/login',userController.getlogin);
router.post('/login',userController.login);
router.get('/logout',userController.logout);
module.exports=router;