const { ObjectId } = require('mongodb');
const connection = require('./connection');
const productsModel = require('./productsModel');

const create = async (sales) => {
  const productId = sales[0].productId;
  const productFromStock = await productsModel.findProductById(productId);
  const quantityToUpdate = productFromStock.quantity - sales[0].quantity;

  await productsModel.changeProductInfo(productId, productFromStock.name, quantityToUpdate);

  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result.ops[0]);
}

const getAll = async () => connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((sales) => sales);

const find = async (id) => connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)))
    .catch(() => null);

const update = async (id, itensSold) => {
  await connection()
  .then((db) => db.collection('sales').updateOne({_id: ObjectId(id)}, {$set: {itensSold}}))
  .then(result => result);

  const updatedSale = await find(id);
  return updatedSale;
}

const remove = async (id) => {
  const sale = await find(id);
  const { itensSold: [{ quantity, productId }] } = sale;

  const productFromStock = await productsModel.findProductById(productId);
  const quantityToUpdate = productFromStock.quantity + quantity;

  await productsModel.changeProductInfo(productId, productFromStock.name, quantityToUpdate);

  return connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}))
    .then(() => sale)
    .catch(() => null);
}


module.exports = {
  create,
  getAll,
  find,
  update,
  remove,
};
