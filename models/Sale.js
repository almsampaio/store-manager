const connection = require('./connection');

const COLLECTION = 'sales';

exports.createSale = async (salesArr) => {
  const db = await connection();

  const sales = await db.collection(COLLECTION).insertOne({ itensSold: salesArr });

  return {
    _id: sales.insertedId,
    itensSold: salesArr,
  };
};
