// const { ObjectID } = require('bson');
const connection = require('./connection');

const salesCrud = async (operation, payload) => {
  const salesCollection = await connection.getConnection()
    .then((db) => db.collection('sales'));

  if (operation === 'addNew') {
    const result = await salesCollection.insertOne({ itensSold: payload });
    return { _id: result.insertedId, itensSold: payload };
  }
};

module.exports = {
  salesCrud,
};
