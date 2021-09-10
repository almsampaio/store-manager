const mongoConnection = require('./connection');
// const productModels = require('./productModels');

// const idProductIsValid = async (arrayParam) => {
//   let invalidProducts = 0;
//   arrayParam.forEach(async (obj) => {
//     const product = await productModels.getById(obj.productId);
//     if (!product) invalidProducts += 1;
//   });
//   if (invalidProducts > 0) return false;
//   return true;
// };

const create = async (products) => {
  // const exists = idProductIsValid(products);
  // if (!exists) return null;
  const db = await mongoConnection.getConnection();
  const { insertedId: id } = await db.collection('sales').insertOne({ itensSold: products });
  return {
    _id: id,
    itensSold: products,
  };
};

module.exports = {
  create,
};
