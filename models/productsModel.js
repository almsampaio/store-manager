const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const serialize = ({ _id, name, quantity }) => (
  {
    _id,
    name,
    quantity,
  }
);

const getAllProdutcts = async () => mongoConnection.getConnection()
      .then((db) => db.collection('products').find().toArray())
          .then((products) => products.map(serialize));
          
const getProductById = async (id) => mongoConnection.getConnection()
      .then((db) => db.collection('products').find({ _id: ObjectId(id) }).toArray())
          .then((products) => products.map(serialize));

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

const putProducts = async (ID, name, quantity) => {
  const prodsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  const upt = await prodsCollection
    .updateOne({ _id: ObjectId(ID) }, { $set: { name, quantity } });

  if (!upt) return null;

  return {
     _id: ID,
    name,
    quantity,
  };
};

const deleteProducts = async (id) => {
  const toDelete = await getProductById(id);
  const prodsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));
  const del = await prodsCollection.deleteOne({ _id: ObjectId(id) });
  if (!del) return null;
  return toDelete;
};

module.exports = {
  getAllProdutcts,
  getProductById,
  createProduct,
  uptadeQuantityOfProduct,
  putProducts,
  deleteProducts,
};
