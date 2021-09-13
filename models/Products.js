const connection = require('./connection');

const getNewProduct = (productData) => {
  const { _id, name, quantity } = productData;
  return {
    _id,
    name,
    quantity,
   };
};

const findProduct = async (name) => {
  const db = await connection();

  const product = db.collection('products').findOne({ name });

  return product;
};

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => getNewProduct({ _id: result.insertedId, name, quantity }));

module.exports = {
  create,
  findProduct,
};
