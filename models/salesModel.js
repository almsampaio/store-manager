const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();

  return sales;
};

const create = async (itensSold) => {
  const db = await connect();
  const sales = await db.collection('sales').insertOne({ itensSold });

  console.log('model');
  console.log(itensSold);

  return { _id: sales.insertedId, itensSold };
};

module.exports = { getAll, create };
