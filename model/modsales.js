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

module.exports = {
  getAll,
  getById,
  create,
/*   editById,
  deleteById, */
};
