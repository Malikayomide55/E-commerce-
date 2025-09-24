const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  cost:{
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Product', userSchema);