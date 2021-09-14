const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getAllSales = async () => {
  const connection = await mongoConnection();
  const result = await connection.collection('sales').find({}).toArray();
  return result;
};

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connection = await mongoConnection();

  const result = await connection.collection('sales').findOne({ _id: (ObjectId(id)) });
  return result;
};

const createSale = async (sales) => {
  const connection = await mongoConnection();
  const result = await connection.collection('sales').insertOne({ itensSold: sales });

  return result.ops[0];

  // Reference for .ops: https://stackoverflow.com/questions/40766654/node-js-mongodb-insert-one-and-return-the-newly-inserted-document
};

const updateSale = async (id, sale) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connection = await mongoConnection();
  await connection.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: sale } },
  );

  return { id, itensSold: sale };
};

const removeSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  
  const connection = await mongoConnection();
  await connection.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  removeSale,
};
