const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true,
  },
  username:{
    type: String,
    default: ""
  },
  password:{
    type: String,
    required: true,
  },
  otp: {type: Number},
  otpUsed: {type: Boolean},
  role:{
    type: String,
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);