const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  const findAllProducts = db.collection('products').find().toArray();
  return findAllProducts;
};

const createProduct = async (name, quantity) => {
  const db = await connection();
  const newProduct = db.collection('products').insertOne({ // não precisa do await pois a collection ele está esperando o await acima
    name,
    quantity,
  }).then((result) => ({ _id: result.insertedId, name, quantity }));

  // console.log(newProduct);
  return newProduct;
};

const findProduct = async (name) => {
  const db = await connection();
  const findOneProduct = db.collection('products').findOne({ name });

  if (!findOneProduct) return null;

  return findOneProduct;
};

const findProductId = async (id) => {
  if (!ObjectID.isValid(id)) return null; // se o id passado não for válido ele barra a conexão
  const db = await connection();
  const findOneProduct = db.collection('products').findOne({ _id: ObjectID(id) });

  return findOneProduct;
};

module.exports = {
  getAllProducts,
  createProduct,
  findProduct,
  findProductId,
};
