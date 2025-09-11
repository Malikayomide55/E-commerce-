const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const userRoutes = require('./route/user.routes.js');

require("dotenv").config()

const connectDb = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    console.log('mongoDB active!');
  }
  catch(e){
    console.log("DB error:",e)
  }}
connectDb();

app.use(express.json())
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});