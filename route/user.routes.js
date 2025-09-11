const express = require("express")
const router=express.Router()
const {Login,Signup}=require("../controller/user.controller.js")
router.post("/Login",Login)
router.post("/signup",Signup)

module.exports=router;