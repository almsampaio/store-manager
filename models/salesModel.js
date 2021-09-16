const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sales) => connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result.ops[0]);

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
