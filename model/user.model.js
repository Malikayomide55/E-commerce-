const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true,
    required: true,
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