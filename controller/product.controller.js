const {createProductService, getProductService, getProductByIdService,} = require('../service/product.service.js');

const createProduct = async (req, res)=>{
  try{
    const {name,image,cost} = req.body
    console.log('req.body', req.body)
    const productData = await createProductService (name, image , cost, userId)
    res.status(200).json()
  }
  catch(e){
    res.status(400).json({error: e.message, status:400})
  }
}

const getProduct = async (req, res)=>{
  try{
    const product = await getProductService()
    res.status(200).json(product)
  }
  catch(e){
    res.status(400).json({error: e.message, status:400})
  }
}
const getProductById = async (req, res)=>{
  try{
    const id = req.params.id
    console.log('id', id)
    if(!id) throw new Error('No id passed')
    res.status(200).json(product)
  }
  catch(e){
    res.status(400).json({error: e.message, status:400})
  }
}

module.exports={ createProduct, getProduct, getProductById };