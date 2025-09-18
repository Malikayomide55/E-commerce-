const mongoose = require('mongoose');
const User = require('../model/user.model.js');
const jwt = require('jsonwebtoken');
const {hashPassword, validatePassword} = require('../utils/hash.utils.js');

const loginService = async(username, password)=>{
  try{
    const existingUser = await User.findOne({username: username})
    if (!existingUser) {
      throw new Error('username does not exist');
    }
    const dbHash = existingUser.password
    const isValid = await validatePassword(password, dbHash)
    if (!isValid) throw new Error('incorrect password and usernamea')
    const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    return{msg: 'login successfully', token: token, data:{username:existingUser.username}, status: 200};
  }
  catch(e){
    return{msg: e.message, status: 404}
  }
};

const signupService = async(username, password)=>{
  const existingUser = await User.findOne({username})
  if (existingUser) throw new Error('username already exist');
  const hashedPassword = await hashPassword(password, 10);
  const newUser = new User({username, password: hashedPassword});
  newUser.save();
  
  return{msg: 'successfully registered'};
};

const otpService = async (username)=>{
  try{
    const existingUser = await User.findOne({username})
    const otp = Math.floor (Math.random()*10**6)
    console.log('otp:', otp)
    if (existingUser.otpUsed) throw new error ('opt has been used')
    existingUser.otp = otp;
    existingUser.otpUsed = false;
    await existingUser.save()
    
    return{msg: 'check email for otp', status: 200};
  }  
  catch(e){
    return{msg: e.message, status: 400};
  }
};

const resetPasswordService = async (username)=>{
  try{
    const existingUser = await User.findOne({username})
    const otp = Math.floor (Math.random()*10**6)
    console.log('otp:', otp)
    if (existingUser.otpUsed) throw new error ('opt has been used')
    existingUser.otp = otp;
    existingUser.otpUsed = false;
    await existingUser.save()
    
    return{msg: 'check email for otp', status: 200};
  }  
  catch(e){
    res.status(400).json({msg: e.message, status: 400})
  }
};

module.exports = {signupService, loginService, otpService, resetPasswordService};