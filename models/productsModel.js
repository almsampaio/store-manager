// Fazer a query

const { ObjectID } = require('mongodb');
const Connection = require('./connection');

const getAllProducts = async () => {
  const db = await Connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getProductById = async (id) => {
  const db = await Connection();
  const product = await db.collection('products').findOne({ _id: ObjectID(id) });
  return product;
};

module.exports = { getAllProducts, getProductById }; 
