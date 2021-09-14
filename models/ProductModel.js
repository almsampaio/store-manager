const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const COLLECTION_PRODUCT = 'products';

const isName = async (name) => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_PRODUCT));

  const product = await productsCollection.findOne({ name });
  
  return product;
};

const getAll = async () => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_PRODUCT));

  const products = await productsCollection.find().toArray();

  return { products };
};

const getById = async (id) => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_PRODUCT));

  if (!ObjectId.isValid(id)) return null;

  const product = await productsCollection.findOne({ _id: ObjectId(id) });

  if (!product) return null;

  const { _id, name, quantity } = product;

  return { _id, name, quantity };
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

const update = async (id, { name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection(COLLECTION_PRODUCT));

  const newData = { name, quantity };

  const updatedUser = await productsCollection
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: newData },
      {
        upsert: true,
        returnDocument: 'after',
      },
    );

    return updatedUser.value;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection(COLLECTION_PRODUCT));

  const removedProduct = await productsCollection
    .findOneAndDelete({ _id: ObjectId(id) });

  // if (removedProduct.value === null) return null;

  return removedProduct.value;
};

module.exports = {
  isName,
  getAll,
  getById,
  create,
  update,
  remove,
};
