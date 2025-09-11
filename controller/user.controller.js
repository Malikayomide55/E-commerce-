const {signupService, loginService} = require("../service/user.service.js")

const Login = async (req,res)=>{
  try{
    const{username,password}=req.body
    const data = await loginService(username,password)
    res.status(200).json(data)
}
catch(e){
  res.status(400).json({Error: e.message})
}
};

const Signup =async (req, res)=>{
  try{
    const{username,password}=req.body
    const data = await signupService(username,password)
    res.status(200).json(data)
}
catch(e){
  res.status(400).json({Error: e.message})
}
};


module.exports={
  Login, Signup
};