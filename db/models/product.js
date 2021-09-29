const connection = require('../index');

const create = async (name, quantity) => {
  const createProduct = await connection().then((db) =>
  db.collection('products').insertOne({ name, quantity }));
  const { _id } = createProduct.ops[0];
  return {
    ...createProduct.ops[0].name,
    _id,
  };
};

const findByName = async (name) => {
  const product = await connection().then((db) =>
  db.collection('products').findOne({ name }));
  return product;
};

module.exports = {
  create,
  findByName,
};
