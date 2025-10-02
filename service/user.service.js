const mongoose = require('mongoose');
const User = require('../model/user.model.js');
const jwt = require('jsonwebtoken');
const {hashPassword, validatePassword} = require('../utils/hash.utils.js');
const {otp} = require('../utils/otp.utils.js');
const {otpMail} = require('../utils/mailer.utils.js');

const loginService = async(email, password)=>{
  try{
    const existingUser = await User.findOne({email: email})
    if (!existingUser) {
      throw new Error('email does not exist');
    }
    const dbHash = existingUser.password
    const isValid = await validatePassword(password, dbHash)
    if (!isValid) throw new Error('incorrect password and email')
    console.log('existingUser:', existingUser)
    const token = jwt.sign({id: existingUser._id, role: existingUser.role, s:'dummy'}, process.env.JWT_SECRET, {expiresIn: '1h'})
    console.log('token:', token)
    return{msg: 'login successfully', token: token, data:{email:existingUser.email}, status: 200};
  }
  catch(e){
    return{msg: e.message, status: 404}
  }
};

const signupService = async(email, password)=>{
  const existingUser = await User.findOne({email})
  if (existingUser) throw new Error('email already exist');
  const hashedPassword = await hashPassword(password, 10);
  const newUser = new User({email, password: hashedPassword});
  newUser.save();
  
  return{msg: 'successfully registered'};
};

const otpService = async (email)=>{
  try{
    const existingUser = await User.findOne({email})
    if(!existingUser) throw new Error ('email does not exist');
    otp
    console.log('generated otp:', otp)
    await otpMail(existingUser.email, otp)
    if (existingUser.otpUsed) throw new Error ('opt has been used')
    existingUser.otp = otp;
    existingUser.otpUsed = false;
    await existingUser.save()
    
    return{msg: 'check email for otp', status: 200};
  }  
  catch(e){
    return{msg: e.message, status: 400};
  }
};

const resetPasswordService = async (email, otp, newPassword)=>{
  try{
    const existingUser = await User.findOne({email})
    if (existingUser.otpUsed) throw new error ('otp has been used')
    if (existingUser.otp!= otp) throw new Error('Incorrect otp')
    
    if (!newPassword) throw new Error ('input a new password')
    const hashedPassword = await hashPassword(newPassword, 10);
    existingUser.password = hashedPassword;
    existingUser.otpUsed = true;
    const token = jwt.sign({id: existingUser._id, role: existingUser.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
    
    await existingUser.save()
    
    return{msg: 'password changed successfully', status: 200, data: existingUser.email, token};
  }  
  catch(e){
    return{msg: e.message, status: 400};
  }
};

module.exports = {signupService, loginService, otpService, resetPasswordService};