// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (data) => {
  const db = await connection();

  const sales = await db.collection('sales').insertMany(
    [
      {
        itensSold: [
         ...data,
        ],
      }],
  );
  return {
    _id: sales.insertedIds[0],
    ...sales.ops[0],
  };
};

module.exports = {
  create,
};