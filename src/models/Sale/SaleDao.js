const { ObjectId } = require('mongodb');
const Connection = require('../../config/databaseMongo');

const getAll = async () => {
  const mongo = await Connection();
  return mongo.collection('sales')
    .find()
    .toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const mongo = await Connection();
  return mongo.collection('sales').findOne({ _id: ObjectId(id) });
};

const create = async (products) => {
  const mongo = await Connection();
  const result = await mongo.collection('sales').insertMany([
    {
      itensSold: [...products],
    },
  ]);

  const [salesSaved] = result.ops;

  return { _id: result.insertedIds[0], ...salesSaved };
};

const update = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  if (!ObjectId.isValid(productId)) return null;
  const product = { productId: ObjectId(productId), quantity };
  const { itensSold } = await findById(id);
  const mongo = await Connection();
  const result = await mongo
    .collection('sales')
    .replaceOne({ _id: ObjectId(id) }, { itensSold: [itensSold, product] });
  console.log(result);

  return { _id: id, itensSold: [{ productId, quantity }] };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const mongo = await Connection();
  const result = await mongo.collection('sales')
    .deleteOne({ _id: ObjectId(id) });

  return result;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
