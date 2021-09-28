const connection = require('./connection');

const collection = 'products';

const addNewProduct = async (newProduct) => {
  try {
    await connection().then((db) => db.collection(collection))
    .insertOne(newProduct);
    return 'Produto adicionado com sucesso!';
  } catch (error) {
    return error;
  }
};

module.exports = {
    addNewProduct,
};