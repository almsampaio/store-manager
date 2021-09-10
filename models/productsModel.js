// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { id: product.insertedId, name, quantity };
};

// const getAll = async () => {
//   const db = await connect();
//   return await db.collection('products').find().toArray();
// };

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
  
//   const db = await connect();
//   return await db.collection('products').findOne(ObjectId(id));
// };

// const update = async (id, name, quantity) => {
//   if (!ObjectId.isValid(id)) return null;

//   const db = await connect();
//   await db.collection('products')
//     .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  
//     return { id, name, quantity };
// };

// const exclude = async (id) => {
//   if (!ObjectId.isValid(id)) return null;

//   const db = await connect();
//   await db.collection('products').deleteOne({ _id: ObjectId(id) });
// };

module.exports = {
  create,
};