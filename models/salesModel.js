const { ObjectId } = require('mongodb');
const connection = require('./connection');
const productsModel = require('./productsModel');

const coll = 'sales';

const add = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const currentProduct = await productsModel.getById(productId);
  const currentQuantity = currentProduct.quantity;
  const newQuantity = currentQuantity - quantity;

  await productsModel.update(productId, currentProduct.name, newQuantity);

  return connection()
    .then((db) => db.collection(coll).insertOne({ itensSold }))
    .then((response) => response.ops[0]);
};

const getAll = async () => connection()
  .then((db) => db.collection(coll).find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection(coll).findOne(new ObjectId(id)));
  
const update = (productId, quantity) => connection()
  .then((db) => db.collection(coll).aggregate([
    { $unwind: '$itensSold' },
    { $match: { 'itensSold.productId': productId } },
    { $set: { 'itensSold.quantity': quantity } },
  ]).toArray());  
  
const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleToBeRemoved = await getById(id);

  if (!saleToBeRemoved) return null;
  
  const { productId, quantity } = saleToBeRemoved.itensSold[0];
  const { name, quantity: currentQuantity } = await productsModel.getById(productId);
  const newQuantity = currentQuantity + quantity;

  await productsModel.update(productId, name, newQuantity);

  return connection()
    .then((db) => db.collection(coll).deleteOne({ _id: new ObjectId(id) }))
    .then(() => saleToBeRemoved);
};  

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
