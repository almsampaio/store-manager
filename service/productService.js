const { ObjectId } = require('mongodb');
const connection = require('../model/connection');
const productModel = require('../model/productModel');
const constants = require('../constants');

module.exports.createProduct = async (serviceData) => {
    const { name } = serviceData;
    const duplicateName = await connection()
      .then((db) => db.collection('products').findOne({ name }));
    if (duplicateName) {
      throw new Error(constants.PRODUCT_EXISTS);
    }
    const product = productModel.createProduct({ ...serviceData });
    return product;
};

module.exports.getAllProducts = async () => {
    const products = await connection()
      .then((db) => db.collection('products').find().toArray());
    return { products };
};

module.exports.getProductById = async ({ id }) => {
    if (!ObjectId.isValid(id)) {
      throw new Error(constants.FORMAT_ID);
    }
    const product = await connection()
      .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
    if (!product) {
      throw new Error(constants.PRODUCT_NOT_FOUND);
    }
    return product;
};

module.exports.updateProduct = async ({ id, updateInfo }) => {
    if (!ObjectId.isValid(id)) {
      throw new Error(constants.FORMAT_ID);
    }
    const product = await connection()
      .then((db) => db.collection('products').updateOne(
        { _id: ObjectId(id) },
        { $set: updateInfo },
      ));
    if (!product) {
      throw new Error(constants.PRODUCT_NOT_FOUND);
    }
    const newProduct = { _id: id, ...updateInfo };
    return newProduct;
};

module.exports.deleteProduct = async ({ id }) => {
    if (!ObjectId.isValid(id)) {
      throw new Error(constants.FORMAT_ID);
    }
    const product = await connection()
      .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectId(id) }));
    if (!product) {
      throw new Error(constants.PRODUCT_NOT_FOUND);
    }
    return product.value;
};
