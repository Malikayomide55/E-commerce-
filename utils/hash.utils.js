const bcrypt = require ('bcryptjs');

const hashPassword= async(password, numOfSalt)=>{
  const salt= await bcrypt.genSalt(numOfSalt);
  console.log('salt:', salt);
  const hash = await bcrypt.hash(password, salt);
  console.log('hash:', hash);
  return hash;
};

const validatePassword= async(password, hash)=>{
  const isValid = await bcrypt.compare(password, hash);
  console.log('isValid:', isValid);
  return isValid;
};

module.exports={
  hashPassword,
  validatePassword,
};