const connect = require('./connection');

const CreateProduct = async (name, quantity) => {
    const product = await connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
    return {
      _id: product.insertedId,
      name,
      quantity,
    };
  };

  const findProducts = async (name) => {
    const result = await connect()
      .then((db) => db.collection('products').findOne({ name }));
    return result;
  };
module.exports = {
    CreateProduct,
    findProducts,
};