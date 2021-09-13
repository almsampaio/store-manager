const { ObjectID } = require('mongodb');
const connection = require('./connection');

// const findProductById = require('./productModel');

// const findProduct = findProductById.findById;

const create = async (itensSold) => {
  const db = await connection();
  const sale = await db.collection('sales').insertMany([{ itensSold }]);

  itensSold.forEach(async ({ productId, quantity }) => {
    await db.collection('products')
      .findOneAndUpdate({ _id: ObjectID(productId) },
        { $inc: { quantity: -quantity } });
  });

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
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const { itensSold } = await db.collection('sales').findOne({ _id: ObjectID(id) });
  itensSold.forEach(async ({ productId, quantity }) => {
    await db.collection('products')
    .findOneAndUpdate({ _id: ObjectID(productId) },
        { $inc: { quantity } });
        return db.collection('sales').deleteOne({ _id: ObjectID(id) });
  });
  // acesso ao banco products dentro de outra query feito com ajuda da Marília ~Mendonça~ Cegalla
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
