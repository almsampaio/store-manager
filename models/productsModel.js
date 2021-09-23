const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
    
  if (product) return null;
  
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((response) => response.ops[0]);
};

const getAll = async () =>
   connection()
    .then((db) => db.collection('products').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
};

const update = async (id, name, quantity) => {
  const objId = new ObjectId(id);

  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products')
      .update({ _id: objId }, { name, quantity }))
    .then(() => ({ _id: id, name, quantity }));
};

module.exports = {
  add,
  getAll,
  getById,
  update,
};
