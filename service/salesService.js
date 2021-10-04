const { ObjectId } = require('mongodb');
const connection = require('../model/connection');
const salesModel = require('../model/salesModel');
const constants = require('../constants');
const { updateCreate, updateDelete } = require('../helpers');
const { getProductById, updateProduct } = require('./productService');

const newProduct = async ({ productId: id, quantity: saleQuantity }) => {
  const { name, quantity: productQuantity } = await getProductById({ id });
  const resultQuantity = productQuantity - saleQuantity;
  const product = {
    id,
    updateInfo: {
      name,
      quantity: resultQuantity,
    },
  };
  await updateProduct(product);
};

const createSales = async (serviceData) => {
  const resultStock = await Promise.all(serviceData.map(async (item) => updateCreate(item)));
  const validate = resultStock.every((item) => item >= 0);
  if (!validate) {
    return {
      status: 404,
      message: {
        err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
      },
    };
  }
  await Promise.all(serviceData.map(async (item) => newProduct(item)));
  const sales = await salesModel.createSales(serviceData);
  return { message: sales, status: 200 };
};

const getAllSales = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return { sales };
};

const getSalesById = async ({ id }) => {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const product = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  if (!product) {
    return false;
  }
  return product;
};

const updateSales = async ({ id, updateInfo }) => {
  const [{ productId, quantity }] = updateInfo;
  
    if (!ObjectId.isValid(id)) {
      throw new Error(constants.FORMAT_ID);
    }
    const sales = await connection()
      .then((db) => db.collection('sales').updateOne(
        { _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } },
      ));
    if (!sales) {
      throw new Error(constants.PRODUCT_NOT_FOUND);
    }
    const newSales = { _id: id, itensSold: [...updateInfo] };
    return newSales;
};

const deleteSales = async ({ id }) => {
  const sale = await getSalesById({ id }); 
  console.log('sale service', sale);
  if (!ObjectId.isValid(id) || !sale) {
    return {
    status: 422,
    message: {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    } };
  }
  await sale.itensSold.forEach((item) => updateDelete(item));
  await salesModel.remove(id);
  return { status: 200, message: sale };
};

module.exports = {
  getSalesById,
  deleteSales,
  updateSales,
  getAllSales,
  createSales,
};
