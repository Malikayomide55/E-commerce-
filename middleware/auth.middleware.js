const jwt = require("jsonwebtoken")
const protect = (req,res,next)=>{
  console.log ("protect m")
 const authHeader= req.headers.authorization
  console.log("protect:",authHeader)
  if(!authHeader) res.status(401).json ({msg:"No auth header"})
  const token = authHeader.split(" "[1])
  console.log("token",token)
  if(!token)res.status(401).json({msg:"please provide new token"})

  try{
    const decoded = jwt.decode(token,process.env.JWT_SECRET)
    console.log("decoded:",decoded)
    if(!decoded)res.status(401).json({msg:"invalid or expired"})
    req.user=decoded
    next()
  }
  catch(e){
    res.status(403).json({msg:"invalid or expired"})
  }
}
const admin = (req,res,next)=>{
  
}
module.exports = {protect,admin}