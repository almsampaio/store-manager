const connection = require('../model/connection');
const productModel = require('../model/productModel');
const constants = require('../constants');

module.exports.createProduct = async (serviceData) => {
  try {
    const { name } = serviceData;
    const duplicateName = await connection()
      .then((db) => db.collection('products').findOne({ name }));
    if (duplicateName) {
      throw new Error(constants.productMessage.PRODUCT_EXISTING);
    }
    const product = productModel.createProduct({ ...serviceData });
    return product;
  } catch (error) {
    console.log('Something went wrong: Service createProduct', error);
    throw new Error(error);
  }
};

module.exports.getAllProducts = async () => {
  try {
    const products = await connection()
      .then((db) => db.collection('products').find().toArray());
    return { products };
  } catch (error) {
    console.log('Something went wrong: Service getAllProducts', error);
    throw new Error(error);
  }
};
