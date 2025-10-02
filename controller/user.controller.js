const {signupService, loginService, otpService, resetPasswordService} = require('../service/user.service.js');

const login = async(req, res)=>{
  try{
    const {email, password} = req.body
    const data = await loginService(email, password);
    res.status(200).json(data);
  }
  catch(e){
    res.status(400).json({error: e.message});
  }
};

const signup = async(req, res)=>{
  try{
    const {email, password} = req.body
    const data = await signupService(email, password);
    res.status(200).json(data);
  }
  catch(e){
    res.status(400).json({error: e.message});
  }
};

const otp = async(req, res)=>{
  try{
    const {email} = req.body
    const data = await otpService(email);
    res.status(200).json(data);
  }
  catch(e){
    res.status(400).json({msg: e.message, status: 400})
  }
};

const resetPassword = async(req, res)=>{
  try{
    const {email, otp, newPassword} = req.body
    const data = await resetPasswordService(email, otp, newPassword);
    res.status(200).json(data);
  }
  catch(e){
    res.status(400).json({msg: e.message, status: 400})
  }
};

module.exports={ login, signup, otp, resetPassword };