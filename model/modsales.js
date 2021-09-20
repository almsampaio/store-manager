// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  // console.log('chegou para create em model', itensSold);
  const db = await connection();
  const createSale = db.collection('sales').insertMany([{ itensSold }])
  .then((result) => ({ _id: Object.values(result.insertedIds).toString(), itensSold }));
  // console.log('enviado para db no model', await createSale);
  return createSale;
};

module.exports = {
/*   getAll,
  getById, */
  create,
/*   editById,
  deleteById, */
};
