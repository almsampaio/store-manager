const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  // console.log('chegou para create em model', itensSold);
  const db = await connection();
  const createSale = db.collection('sales').insertMany([{ itensSold }])
  .then((result) => ({ _id: Object.values(result.insertedIds).toString(), itensSold }));
  // console.log('enviado para db no model', await createSale);
  return createSale;
};

const getById = async (productId) => {
  console.log('chegou do serv para db', productId);
  if (!ObjectId.isValid(productId)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(productId) });
  console.log('resposta do db', result);
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = db.collection('sales').find({}).toArray();
  return result;
};

const editById = async (id, sales) => {
  console.log('id vinde da serv', id);
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = await db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: sales } },
      { returnOriginal: false },
    );
  console.log('respoata do db em model', product);
  return product.value;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const sale = await db.collection('sales').findOneAndDelete({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
