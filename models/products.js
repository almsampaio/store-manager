// Solução encontrada em conjunto com Eduardo Costa - Turma 10A
const { ObjectId } = require('mongodb');

const connectionDb = require('./connection');

const getAll = async () => {
  const allProducts = await connectionDb()
    .then((db) => db.collection('products').find({}).toArray());
    return allProducts;
};

const newProduct = async (name, quantity) => {
  const productNew = await connectionDb()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return productNew;
};

const searchById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const searchId = await connectionDb()
    // .then((db) => db.collection('products').find({ id }).toArray());
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  if (!searchId) return null;
  return searchId;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId(id)) return null;
  const update = await connectionDb();
  // .then((db) => db.collection('products')
  await update.collection('products')
    .updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: { name, quantity },
      },
    );
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const delProd = await connectionDb();
  const findProduct = await searchById(id);
  await delProd.collection('products')
    .deleteOne(
      {
        _id: ObjectId(id),
      },
    );
  return findProduct;
};

module.exports = {
  newProduct,
  getAll,
  searchById,
  updateProduct,
  deleteProduct,
};
