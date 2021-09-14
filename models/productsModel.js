const { ObjectId } = require('mongodb');
const connection = require('./connection');

const coll = 'products';

const add = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection(coll).findOne({ name }));

  if (product) return null;

  return connection()
    .then((db) => db.collection(coll).insertOne({ name, quantity }))
    .then((response) => response.ops[0]);
};

const getAll = async () => connection()
    .then((db) => db.collection(coll).find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection(coll).findOne(new ObjectId(id)));
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection(coll)
      .update({ _id: new ObjectId(id) }, { name, quantity }))
    .then(() => ({ _id: id, name, quantity }));
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productToBeRemoved = await getById(id);

  if (!productToBeRemoved) return null;

  return connection()
    .then((db) => db.collection(coll).deleteOne({ _id: new ObjectId(id) }))
    .then(() => productToBeRemoved);
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
