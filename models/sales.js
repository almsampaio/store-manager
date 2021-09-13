const { ObjectID } = require('bson');
const connection = require('./connection');

const salesCrud = async (operation, payload) => {
  const salesCollection = await connection.getConnection()
    .then((db) => db.collection('sales'));

  if (operation === 'addNew') {
    const result = await salesCollection.insertOne({ itensSold: payload });
    return { _id: result.insertedId, itensSold: payload };
  }
  if (operation === 'getAll') {
    const result = await salesCollection.findOne().toArray();
    return { sales: result };
  }
  if (operation === 'getById') {
    const { id } = payload;
    if (!ObjectID.isValid(id)) return { message: 'id invalido' };
    const result = await salesCollection.findOne({ _id: ObjectID(id) });
    return result;
  }
};

module.exports = {
  salesCrud,
};
