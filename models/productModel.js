// const ObjectId = require('mongodb').ObjectID;
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getProductName = async (name) =>
  connection()
    .then((db) => db.collection('products').find({ name }).toArray());

const createProduct = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity })
    .then((result) => result.ops[0]));
    
const getAll = async () =>
  connection()
    .then((db) => db.collection('products').find({}).toArray());

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  return result;
};

const updateOne = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  connection().then((db) => 
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { _id: id, name, quantity };
};

const delOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectId(id) }));
  return result;
};

module.exports = {
  getProductName,
  createProduct,
  getAll,
  getOne,
  updateOne,
  delOne,
};