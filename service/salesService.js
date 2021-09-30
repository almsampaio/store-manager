const { ObjectId } = require('mongodb');
const connection = require('../model/connection');
const salesModel = require('../model/salesModel');
const constants = require('../constants');

module.exports.createSales = async (serviceData) => {
  try {
    const sales = await salesModel.createSales(serviceData);
    return sales;
  } catch (error) {
    console.log('Something went wrong: Service createSales', error);
    throw new Error(error);
  }
};

module.exports.getAllSales = async () => {
  try {
    const sales = await connection()
        .then((db) => db.collection('sales').find().toArray());
      return { sales };
  } catch (error) {
    console.log('Something went wrong: Service getAllSales', error);
    throw new Error(error);
  }
};

module.exports.getsalesById = async ({ id }) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error(constants.dataBaseMessage.INVALID_ID);
    }
    const product = await connection()
      .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    return product;
  } catch (error) {
    console.log('Something went wrong: Service getsalesById', error);
    throw new Error(error);
  }
};