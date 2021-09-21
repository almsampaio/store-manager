const { ObjectId } = require('mongodb');
const connection = require('../connection');

const insert = async (products) => {
  try {
    const database = await connection();
    const { insertedId } = database.collection('sales').insertOne({ itensSold: products });
  
    return {
      _id: insertedId,
      itensSold: products,
    };
  } catch (e) {
    console.log(`Não foi possível inserir os produtos [${products}], erro [${e}]`);
  }
};

const getById = async (id) => {
  try {
    const database = await connection();
    const sale = await database.collection('sales').findOne(ObjectId(id));
    return sale;
  } catch (e) {
    console.log(`Não foi possível localizar a venda id [${id}], erro [${e}]`);
  }
};

const getAll = async () => {
  try {
    const database = await connection();
    const sales = await database.collection('sales').find().toArray();

    return sales;
  } catch (e) {
    console.log(`Não foi possível recuperar as vendas, erro [${e}]`);
  }
};

module.exports = {
  insert,
  getById,
  getAll,
};