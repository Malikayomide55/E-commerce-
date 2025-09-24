const mongoose = require('mongoose');
const Product = require('../model/product.model.js');

const createProductService = async(name, image, cost, userId)=>{
  try{
    const payload ={name, image, cost, user:userId}
    const data = await Product.create(payload)
    return{msg: 'data created successfully', status: 200, data}
  }
  catch(e){
    return{msg: e.message, status: 400}
  }
};

const getProductService = async()=>{
  try{
    const productData = await Product.find()
    console.log('product data:', productData)
    return{msg: 'data fetched successfully', status: 200, data: productData}
  }
  catch(e){
    return{msg: e.message, status: 400, data:[]}
  }
};

const getProductByIdService = async(id)=>{
  try{
    if(!mongoose.Types.ObjectId.isValid(id)) return{msg: 'this is not a valid mongoose id', status: 200, data:[]}
    const productData = await Product.findById(id)
    if(!productData) return{msg: 'product with id does not exist', status: 200, data:[]}
    console.log('product data:', productData)
    return{msg: 'data fetched successfully', status: 200, data: productData}
  }
  catch(e){
    return{msg: e.message, status: 400, data:[]}
  }
};

module.exports={
  createProductService,
  getProductService,
  getProductByIdService,
}