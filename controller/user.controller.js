const {signupService, loginService} = require('../service/user.service.js');

const login = async(req, res)=>{
  try{
    const {username, password} = req.body
    const data = await loginService(username, password);
    res.status(200).json(data);
  }
  catch(e){
    res.status(400).json({error: e.message});
  }
};

const signup = async(req, res)=>{
  try{
    const {username, password} = req.body
    const data = await signupService(username, password);
    res.status(200).json(data);
  }
  catch(e){
    res.status(400).json({error: e.message});
  }
};

module.exports={ login, signup };