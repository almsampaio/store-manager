const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products.map(({ _id, name, quantity }) => ({
    _id,
    name,
    quantity,
  }));
};

const create = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  console.log(product.ops[0]);
  return product.ops[0];
  // return {
  //   _id: product.insertedId,
  //   name: product.name,
  //   quantity: product.quantity,
  // };
};

module.exports = {
  create,
  getAll,
};
