// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addNewSale = async (productsSold) => {
  const data = await connection().then((db) => db.collection('sales'));

  return data.insertOne({ itensSold: productsSold })
    .then((result) => ({ _id: result.insertedId, itensSold: productsSold }));
};

module.exports = {
  addNewSale,
};
