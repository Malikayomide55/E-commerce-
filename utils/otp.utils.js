const otpNum = 6 //numver of otp to generate
const otp= number(Math.floor(Math.random()*10**6).toSting().padEnd(otpNum,'0'))
console.log("otp:",otp)
 
 module.exports={
   otp
 }