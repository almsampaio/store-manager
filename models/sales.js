const connection = require('./connection');

const create = async (itensSold) => {
  const itemCreate = await connection()
    .then((db) => db.collection('sales').insertMany([{ itensSold }]));
    console.log('Itemcreate here', itemCreate);
  return {
    _id: Object.values(itemCreate.insertedIds)[0],
    itensSold,
  };
};

module.exports = {
  create,
};