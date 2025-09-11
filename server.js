const express = require ("express");
const app = express ();
const mongoose = require('mongoose');
const userRoute = require('./route/user.route.js');
require('dotenv').config();

//connect mongodb
const connectDB = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('mongoDB active!!')
  }
  catch(e){
    console.error('DB error:', (e));
  }
};
connectDB();

//routes
app.use(express.json());
app.use('/api', userRoute);

app.get('/', (req, res)=>{
  res.send('welcome')
});

app.listen(5000, ()=>{
  console.log('server is running');
});