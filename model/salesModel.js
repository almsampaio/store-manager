const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = (productData) => (connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: productData }))
  .then((result) => result.ops[0]))
  .catch((error) => {
    console.log('Unable to create sales ===', error);
    throw new Error(error);
  });

const remove = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return true;
};

module.exports = {
  remove,
  createSales,
};
