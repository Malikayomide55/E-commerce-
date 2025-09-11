const mongoose = require("mongoose");
const User = require("../model/user.model.js");
const jwt = require ("jsonwebtoken");
const {hashPassword, validatePassword} = require('../utils/hash.utils.js');

const loginService = async(username,password)=>{
  try {
    const existingUser= await User.findOne({username:username})
    if(!existingUser) throw new error ("username does not exist")
    console.log("user:", existingUser )
    const dbhash = existingUser.password
    const isValid = await validatePassword(password, dbhash)
    if (isValid) throw new Error("Incorrect Password and username")
    const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn: "1h"})
    return {msg: "login successfully!", token: token, data:{username:existingUser.username}}
  }
  catch (e){
    return {Errormsg: e.message}
  }
  
  
}

const signupService= async(username,password  )=>{
  const existingUser=await User.findOne({username})
  if(existingUser) throw new Error ("username already exists")
  const hashedPassword = await hashPassword(password, 10)
  const newUser = new User ({username,password: hashedPassword})
  newUser.save()
  return {msg:"successfully registered"}
}
module.exports={signupService, loginService}