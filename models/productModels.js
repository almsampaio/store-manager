const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getByName = async (paramName) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('products').findOne({ name: paramName });
  if (!result) return null;
  return result;
};

const create = async (name, quantity) => {
  const nameExists = await getByName(name);
  if (nameExists) return null;

  const db = await mongoConnection.getConnection();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: ObjectId(id),
    name, 
    quantity,
  };
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('products').find().toArray();
  return { products: result };
};

const getById = async (idParam) => {
  const isValid = ObjectId.isValid(idParam);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  const result = await db.collection('products').findOne({ _id: ObjectId(idParam) });
  if (!result) return null;
  return result;
};

const updateQuantity = async (idParam, qtd) => {
  const isValid = ObjectId.isValid(idParam);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  const check = await getById(idParam);

  if (parseInt(check.quantity, 10) < parseInt(qtd, 10)) return 1;

  await db.collection('products').updateOne(
    { _id: ObjectId(idParam) },
    { $inc: { quantity: -qtd } },
  );
  
  return 0;
};

const cancelSale = async (idParam, qtd) => {
  const isValid = ObjectId.isValid(idParam);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  await db.collection('products').updateOne(
    { _id: ObjectId(idParam) },
    { $inc: { quantity: +qtd } },
  );
  
  return true;
};

const updateById = async (idParam, name, quantity) => {
  const isValid = ObjectId.isValid(idParam);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  await db.collection('products').updateOne(
    { _id: ObjectId(idParam) },
    { $set: { name, quantity } },
  );

  return {
    _id: idParam,
    name,
    quantity,
  };
};

const removeById = async (idParam) => {
  const product = await getById(idParam);
  if (!product) return null;
  const db = await mongoConnection.getConnection();
  await db.collection('products').deleteOne({ _id: ObjectId(idParam) });
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  removeById,
  updateQuantity,
  cancelSale,
};
