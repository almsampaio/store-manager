const connection = require('./connections');

const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const createNewProduct = async (name, quantity) => {
  const productNew = await connection().then((db) =>
  db.collection('products').insertOne({ name, quantity }));
  return {
    _id: productNew.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  findByName,
  createNewProduct,
};