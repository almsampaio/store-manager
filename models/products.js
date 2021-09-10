const connection = require('./connection');

const addNew = async (newProduct) => {
  const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection.insertOne(newProduct);

  return { _id, ...newProduct };
};

const getByName = async (name) => {
  const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ name });

  if (!product) return false;
  return product;
};

module.exports = {
  addNew,
  getByName,
};
