const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const create = async (name, quantity) => 
  getConnection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (name) => {
  const product = await getConnection()
  .then((db) => db.collection('products').findOne({ name }));
      if (!product) return null;
      return product; 
};
const getAll = async () => {
  const db = await getConnection(); 
  const productsList = await db.collection('products').find({}).toArray();
  const productsAll = { products: [...productsList] };
  return productsAll;
};

const getById = async (id) => {
  const idSize = 24;
  if (id.length < idSize) return null;
  const db = await getConnection(); 
  // fonte: https:qastack.com.br/programming/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
  const productsId = await db.collection('products').findOne({ _id: ObjectId(id) });
  if (!productsId) return null;
  return productsId;
};
const productUpdate = async (id, name, quantity) => {
  const db = await getConnection(); 
  const updatedProduct = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) }, 
    { $set: 
      { name, quantity },
    },
    { returnDocument: 'after' },
  );
  return updatedProduct.value;
};

module.exports = {
    create,
    getAll,
    findByName,
    getById,
    productUpdate,
};