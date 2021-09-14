const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getAllProdutcts = async () => mongoConnection.getConnection()
      .then((db) => db.collection('products').find().toArray())
          .then((products) =>
              products.map(({ _id, name, quantity }) =>
              ({
                _id,
                name,
                quantity,
              })));

const uptadeQuantityOfProduct = async (sale) => {
  const prodsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  sale.forEach(async (element) => {
    await prodsCollection
    .updateOne({ _id: ObjectId(element.productId) }, { $inc: { quantity: -element.quantity } });
  });

  return null;
};

const createProduct = async ({ name, quantity }) => {
  const prodsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  const { insertedId: id } = await prodsCollection
    .insertOne({ name, quantity });

  return {
    _id: id,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
  getAllProdutcts,
  uptadeQuantityOfProduct,
};
