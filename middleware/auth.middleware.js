const jwt = require('jsonwebtoken');
const protect = (req, res, next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader) res.status(401).json({msg:'no authorization header'});
  
  const token = authHeader.split(' ')[1];
  if(!token) res.status(401).json({msg:'please provide a token'});
  try{
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    console.log('decoded:', decoded)
    if(!decoded) res.status(401).json({msg:'invalid token'})
    req.user = decoded
    next()
  }
  catch(err){
    res.status(403).json({msg:'invalid or expired token'})
  }
};

const admin = (req, res, next)=>{};

module.exports={
  protect,
  admin
};