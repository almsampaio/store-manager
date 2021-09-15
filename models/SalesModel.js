const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const COLLECTION_SALES = 'sales';

const create = async (arraySold) => {
  const salesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection(COLLECTION_SALES));
  
    const { insertedId: _id } = await salesCollection.insertOne({
      itensSold: arraySold,
    });

    return {
      _id,
      itensSold: arraySold,
    };
};

module.exports = {
  create,
};
