const connection = require('./connection');

const collection = 'sales';

const addSales = async (dataSales) => {
  const salesCollection = await connection()
    .then((db) => db.collection(collection));

  const { insertedId: _id } = await salesCollection.insertOne({
    itensSold: dataSales,
  });

  return {
    _id,
    itensSold: dataSales,
  };
};

module.exports = {
  addSales,
};