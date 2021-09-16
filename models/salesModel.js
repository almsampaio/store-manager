const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (itens) => {
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: itens }));
  console.log(result);
  return (result.ops[0]);
  };

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return result;
};

const getAll = async () => {
  const result = await connection()
    .then((db) => db.collection('sales').find({}).toArray());
  return ({ sales: result });
};

module.exports = {
 createSales,
 getOne,
 getAll,
};