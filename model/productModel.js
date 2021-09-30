const connection = require('./connection');

const getNewProduct = (productData) => {
  const { id, name, quantity } = productData;
  return {
    _id: id,
    name,
    quantity,
  };
};

module.exports.createProduct = ({ name, quantity }) => (connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => getNewProduct({
    id: result.insertedId,
    name,
    quantity,
}))
  .catch((error) => {
    console.log('Unable to create product ===', error);
    throw new Error(error);
  })
);
