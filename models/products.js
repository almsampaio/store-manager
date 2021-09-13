const { ObjectID } = require('bson');
const connection = require('./connection');

const addNew = async (newProduct) => {
  const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await productsCollection.insertOne(newProduct);

  return { _id, ...newProduct };
};

const getByName = async (name) => {
  const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ name });
  return product;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return { message: 'id invalido' };

  const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ _id: ObjectID(id) });

  if (!product) return { message: 'nao encontrado' };
  return product;
};

const getAll = async () => {
  const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

  const products = await productsCollection.find().toArray();
  return { products };
};

const updateOne = async (name, quantity) => {
  const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

  const result = await productsCollection.updateOne({ name }, { $set: { quantity } });
  return result;
};

const excludeOne = async (id) => {
  const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

  if (!ObjectID.isValid(id)) return { message: 'Wrong id format' };

  const result = await productsCollection.findOneAndDelete({ _id: ObjectID(id) });
  console.log(result);
  return result.value;
};

module.exports = {
  addNew,
  getByName,
  getById,
  getAll,
  updateOne,
  excludeOne,
};
