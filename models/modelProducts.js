const connection = require('./connection');

const additionProduct = async (dataProduct) => {
  const { name, quantity } = dataProduct;

  const collectionProducts = await connection()
    .then((db) => db.collection('products'));
  
  const { insertdId: _id } = await collectionProducts.insertOne({
    name,
    quantity,
  });

  return {
    _id,
    name,
    quantity,
  };
};

module.exports = {
  additionProduct,
};