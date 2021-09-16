const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (itens) => {
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: itens }));
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

const updateOne = async (id, saleContent) => {
  console.log('chegou aqui');
  if (!ObjectId.isValid(id)) return null;
  connection()
    .then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: saleContent } }));
  return ({ _id: ObjectId(id), itensSold: saleContent });
};

const delOne = (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }));  
  return result;
};

module.exports = {
 createSales,
 getOne,
 getAll,
 updateOne,
 delOne,
};