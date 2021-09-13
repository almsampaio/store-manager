const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getNewProduct = (product) => {
//   const { _id, name, quantity } = product;
//   return {
//     _id,
//     name,
//     quantity,
//   };
// };

const findProduct = async (name) => {
  const product = connection().then((db) =>
    db.collection('products').findOne({ name }));
  if (!product) return null;
  return product;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)));
  if (!product) return null;
  return product;
};

const getAll = async () => {
  const products = await connection().then((db) =>
    db.collection('products').find({}).toArray());
  if (!products) return null;
  return products;
};

const createProduct = async (name, quantity) => {
  const product = connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((data) => ({ _id: data.insertedId, name, quantity }));
  return product;
};

const editProduct = async (name, quantity, id) => {
  const editedProduct = connection()
    .then((db) =>
      db
        .collection('products')
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: { name, quantity } },
          { returnDocument: 'after' },
        ))
    .then((product) => product.value);

  return editedProduct;
};

const deleteProduct = (id) => {
  const deletedProduct = connection()
    .then((db) =>
      db.collection('products').findOneAndDelete({ _id: ObjectId(id) }))
    .then((product) => product.value);
  return deletedProduct;
};

module.exports = {
  createProduct,
  findProduct,
  getProductById,
  getAll,
  editProduct,
  deleteProduct,
};
