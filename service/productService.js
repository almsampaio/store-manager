const { ObjectId } = require('mongodb');
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

module.exports.getProductById = async ({ id }) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error(constants.dataBaseMessage.INVALID_ID);
    }
    const product = await connection()
      .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    return product;
  } catch (error) {
    console.log('Something went wrong: Service getProductById', error);
    throw new Error(error);
  }
};

module.exports.updateProduct = async ({ id, updateInfo }) => {
  try {
    const product = await connection()
      .then((db) => db.collection('products').updateOne(
        { _id: ObjectId(id) },
        { $set: updateInfo },
      ));
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    const newProduct = { _id: id, ...updateInfo };
    return newProduct;
  } catch (error) {
    console.log('Something went wrong: Service updateProduct', error);
    throw new Error(error);
  }
};
