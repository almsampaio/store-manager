const mongoConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));
  
    const { insertedId: _id } = await productsCollection.insertOne({ name, quantity });
    return {
      _id,
      name,
      quantity,
    };
};

// console.log(create({ name: 'anderson', quantity: 1 }).then((data) => console.log(data)));

module.exports = {
  create,
};
