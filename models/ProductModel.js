const mongoConnection = require('./connection');

// const productCollection = async () => mongoConnection.getConnection()
//   .then((db) => db.collection('products'));

const COLLECTION_PRODUCT = 'products';

const isName = async (name) => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_PRODUCT));

  const product = await productsCollection.findOne({ name });
  
  if (product) return true;
  return false;
};

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection(COLLECTION_PRODUCT));
  
    const { insertedId: _id } = await productsCollection.insertOne({ name, quantity });
    return {
      _id,
      name,
      quantity,
    };
};

const getAll = async () => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_PRODUCT));

  const products = await productsCollection.find().toArray() || [];

  return { products };
};

// console.log(create({ name: 'anderson', quantity: 1 }).then((data) => console.log(data)));
// console.log(create({ name: 'anderson', quantity: 1 }).then((data) => console.log(data)));
// console.log(isName('tu').then((data) => console.log(data)));
// console.log(getAll().then((data) => console.log(data)));

module.exports = {
  create,
  getAll,
  isName,
};
