const { ObjectId } = require('mongodb');
const connection = require('../connection');

const insert = async (products) => {
  try {
    const database = await connection();
    const result = await database.collection('sales').insertOne({ itensSold: products });
  
    return result.ops[0];
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

const update = async (id, sale) => {
  try {
    const database = await connection();
    const updatedSale = await database.collection('sales').findOneAndUpdate(
      {
        _id: ObjectId(id),
      }, 
      {
        $set: { itensSold: sale },
      },
      {
        returnOriginal: false,
      },
    );
    return updatedSale;
  } catch (e) {
    console.log('Não foi possível atualizar produto');
  }
};

const remove = async (id) => {
  try {
    const database = await connection();
    const removedSale = await database.collection('sales').deleteOne(ObjectId(id));
    return removedSale;
  } catch (e) {
    console.log(`Não foi possível deletar a venda id [${id}], erro [${e}]`);
  }
};

module.exports = {
  insert,
  getById,
  getAll,
  update,
  remove,
};