const handler = require("../utils/resHandler");


const ProductAttribute = require("../models/productAttributes");
const ProductModel = require("../models/product");
const mongoose = require("mongoose");

module.exports = class ProductService {
  async create(product) {
    const Product = await  ProductModel.create(product);
    return Product;
  }
  async update(...product) {
    const [id, body] = product;
    return await ProductModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
  }
  //to increase price
  //async  updateAll()
  async delete(product) {
    await ProductModel.findByIdAndDelete(product);

  }


  //search by single product by id
  async getProduct(product) {
    const data = await ProductModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(product) } },
      {
        $lookup: {
          from: "productattributes",
          localField: "category_id",
          foreignField: "productCategory._id",
          as: "category_id",
        },
      },
     { $unwind: "$category_id" },
     
      {
        $project: {
          _id: 0,
          name:1,
          desc: 1,
          SKU: 1,
          img:1,
         category:"$category_id.productCategory.name",//.name",
          price: 1,
          launch:"$category_id.productCategory.desc",
          quantity: "$category_id.productInventory.quantity",
          discount: "$category_id.discount.discountpercent",
          manufacturedAt:'$createdAt'
        },
      },
    ]);
    return data[0];
  }
  //show all unique product and its quantity
  async getAllProduct() {
    return await ProductModel.find({})

  //  return await ProductModel.aggregate([
  //     { $match: {} },
  //     { $group: { _id: "$_id", avalaible: { $count: {} } } },
  //     { $project: { _id: 0, product: "$_id", quantity: "$avalaible" } },
  //   ]);
  }
  //show all product in unique
  async uniqueProduct() {
    return await ProductModel.distinct("name");
  }

  //creating product attributes

  async productAttribute(credential) {
    const result = await ProductAttribute(credential);
    return result.save();
  }

 
};
