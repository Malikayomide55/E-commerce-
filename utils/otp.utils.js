const otpNum = 6; //number of otp to generate
const otp = Number (Math.floor (Math.random()*10**otpNum).toString().padEnd(otpNum, '0'))

module.exports={
  otp
}