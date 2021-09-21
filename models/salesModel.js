const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (sale) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
  .then((result) => result.ops[0]);

const getAll = () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));

const update = async (id, itensSold) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const updateSale = await db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  
    return updateSale;
  };

module.exports = { 
  create,
  getAll,
  getById,
  update,
};
