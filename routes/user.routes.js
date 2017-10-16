var express=require('express');
var router=express.Router();
var userController=require('../controllers/user.controller');

//route to get all the user listing
router.get('/users',userController.getUsers);
router.get('/register',userController.getCreateUser);
router.post('/register',userController.createUser);

module.exports=router;