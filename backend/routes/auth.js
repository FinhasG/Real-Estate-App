const express=require('express');
const router=express.Router();
const {SignUp}=require('../controllers/authController.js')
const {Login}=require('../controllers/authController.js')

router.post('/signup',SignUp)
router.post('/login', Login)

module.exports=router