const { ObjectId } = require('mongodb');
const connection = require('./connection');
const productsModel = require('./productsModel');

const create = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  const currentProduct = await productsModel.findById(productId);

  if (!currentProduct) return null;

  const updateQuantity = currentProduct.quantity - quantity;

  await productsModel.updateOne(productId, currentProduct.name, updateQuantity);

  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);
};

const findAll = () =>
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((response) => ({ sales: response }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  return sale;
};

const updateOne = async (productId, quantity) => connection()
    .then((db) => db.collection('sales').aggregate([
      { $unwind: '$itensSold' },
      { $match: { 'itensSold.productId': productId } },
      { $set: { 'itensSold.quantity': quantity } },
    ]).toArray());

  const deleteOne = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const saleRemoved = await findById(id);

    if (!saleRemoved) return null;

    const { productId, quantity } = saleRemoved.itensSold[0];
    const currentProduct = await productsModel.findById(productId);
    const updateQuantity = currentProduct.quantity + quantity;

    await productsModel.updateOne(productId, saleRemoved.name, updateQuantity);

    const sale = await connection()
      .then((db) => db.collection('sales').deleteOne({ _id: new ObjectId(id) }))
      .then(() => saleRemoved);

    return sale;
  };

module.exports = {
  create,
  findAll,
  findById,
  updateOne,
  deleteOne,
};
