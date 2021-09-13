const mongoConnection = require('./connection');

// const productCollection = async () => mongoConnection.getConnection()
//   .then((db) => db.collection('products'));

const isName = async (name) => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ name });
  
  if (product) return true;
  return false;
};

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

const getAll = async () => {};

// console.log(create({ name: 'anderson', quantity: 1 }).then((data) => console.log(data)));
// console.log(isName('tu').then((data) => console.log(data)));

module.exports = {
  create,
  getAll,
  isName,
};
