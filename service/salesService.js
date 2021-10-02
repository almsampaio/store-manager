const { ObjectId } = require('mongodb');
const connection = require('../model/connection');
const salesModel = require('../model/salesModel');
const constants = require('../constants');
const { updateProductAfterSalesCreation, updateProductAfterDeletingSales } = require('../helpers');

module.exports.createSales = async (serviceData) => {
  try {
    const sales = await salesModel.createSales(serviceData);
    await updateProductAfterSalesCreation(sales);
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

module.exports.getSalesById = async ({ id }) => {
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
    console.log('Something went wrong: Service getSalesById', error);
    throw new Error(error);
  }
};

module.exports.updateSales = async ({ id, updateInfo }) => {
  const [{ productId, quantity }] = updateInfo;
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error(constants.dataBaseMessage.INVALID_ID);
    }
    const sales = await connection()
      .then((db) => db.collection('sales').updateOne(
        { _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } },
      ));
    if (!sales) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    const newSales = { _id: id, itensSold: [...updateInfo] };
    return newSales;
  } catch (error) {
    console.log('Something went wrong: Service updateSales', error);
    throw new Error(error);
  }
};

module.exports.deleteSales = async ({ id }) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error(constants.dataBaseMessage.INVALID_ID);
    }
    const sale = await connection()
      .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }));
    if (!sale) {
      throw new Error({ error: constants.sales.SALES_NOT_FOUND });
    }
    await updateProductAfterDeletingSales(sale.value);
    return sale.value;
  } catch (error) {
    console.log('Something went wrong: Service deleteSales', error);
    throw new Error(error);
  }
};
