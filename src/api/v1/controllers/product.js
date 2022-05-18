const Handler = require('../../../utils/resHandler')
const _ =  require('lodash')

const ProductService = require('../../../sevices/product')
const productService = new ProductService()

module.exports = class ProductController{
   async create(req,res){
     //req.body.img = req.file.path
    let response  = await productService.create(req.body)
    if(!response) return Handler.noContent('Enter valid credential',false,res )
    
    // response = _.pick(response,['name','desc','SKU','category_id','inventory_id','price','discount_id'])
   return Handler.success('Success',response,res)

    }
    async update(req,res){
    const response = await  productService.update(req.query.id,req.body)

    if(!response) return Handler.notFound('Not Found',false,res )
    return Handler.success('updated',response,res)

    }
    async delete(req,res){
        let response  = await productService.delete(req.query.product)
        response = _.pick(response,['title','categories','color'])
       
    if(!response) return Handler.notFound('Not Found',false,res )
    return Handler.success('deleted',response,res)
    }
   // get single product BY TITLE
    async getProduct(req,res){
        let response  = await productService.getProduct(req.query.product)
        // response = _.pick(response,['title','description','img','categories','size','color','price'])
       if(!response) return Handler.notFound('Not Found',false,res )
    return Handler.success('product',response,res)
    }
    //available of all each product 
    async getAllProduct(req,res){
        
        const response  = await productService. getAllProduct()
        if(!response) return Handler.notFound('Not Found',false,res )
        return Handler.success('product avalaible',response,res)
    }
    //show unique
  async uniqueProduct(req,res){
    const response  = await productService.uniqueProduct()
    if(!response) return Handler.notFound('Not Found',false,res )
    return Handler.success('Product found',response,res)
  }
  //creating product attribute
  async productAttribute(req,res){
    const response  = await productService.productAttribute(req.body)
    if(!response) return Handler.notFound('Not Found',false,res )
    return Handler.success('Product found',response,res)
  }

  
}