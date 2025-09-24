const optNum = 6; //number of otp to generate
const otp = Number (Math.floor (Math.random()*10**optNum).toString().padEnd(optNum, '0'))

module.exports={
  otp
}