const { ObjectId } = require('mongodb');
const connection = require('./connection');

const errMessage = 'Wrong id format';

const updateProduct = async (req) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  if (!ObjectId.isValid(id)) {
    throw new Error(errMessage);
  }

  const update = await connection()
    .then((db) => {
        const productId = new ObjectId(id);
        const newData = { name, quantity };
        return db.collection('products')
          .findOneAndUpdate({ _id: productId }, { $set: newData }, { returnDocument: 'after' })
          .then((result) => result.value);
    });

    if (!update) throw new Error(errMessage);

    const updatedProduct = await connection().then((db) => db.collection('products')
      .findOne(new ObjectId(id)));

    return updatedProduct;
};

const getProducts = async () => {
  const data = await connection().then((db) => db.collection('products')
    .find().toArray());
  return data;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(errMessage);
  }

  const product = await connection()
  .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!product) throw new Error(errMessage);

  return product;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(errMessage);
  }

  const deleteItem = await connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: new ObjectId(id) }));

    if (!deleteItem) throw new Error(errMessage);

    const products = await getProducts();

    return products;
};

const addProduct = async (name, quantity) => {
  const data = await connection().then((db) => db.collection('products'));

  const alreadyExists = await data.find({ name }).toArray();

  if (alreadyExists.length === 0) {
    return data.insertOne({ name, quantity })
          .then((result) => ({ _id: result.insertedId, name, quantity }));
  }

  throw new Error('Product already exists');
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
