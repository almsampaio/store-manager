const { ObjectID } = require('mongodb');
const connection = require('./connection');

const findProductById = require('./productModel');

const findProduct = findProductById.findById;

const create = async (itensSold) => {
  const [{ productId, quantity }] = itensSold;
  console.log(quantity);
  const verify = findProduct(productId);
  const { quantity: quantityFromProduct } = verify;
  if (quantity > quantityFromProduct) {
    return null;
  }

  const sale = await connection()
    .then((db) => db.collection('sales').insertMany([{
      itensSold,
    }]));

  return {
    _id: Object.values(sale.insertedIds).toString(),
    itensSold,
  };
};

const getAll = async () => {
  const itensSold = connection()
    .then((db) => db.collection('sales').find().toArray());
  return itensSold;
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const sales = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectID(id) }));

  return sales;
};

const updateById = async (id, itensSold) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  await db.collection('sales').findOneAndUpdate({
    _id: ObjectID(id),
  }, 
  { $set: { itensSold } });
  const findOne = await findById(id);
  // console.log(findOne);

  return findOne;
};

const deleteById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }
  const db = await connection();
  const sales = await db.collection('sales')
    .deleteOne({ _id: ObjectID(id) });
  return sales;
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
