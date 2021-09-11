const { ObjectId } = require('mongodb');
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

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const getById = async (idParam) => {
  const isValid = ObjectId.isValid(idParam);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(idParam) });
  if (!result) return null;
  return result;
};

module.exports = {
  create,
  getAll,
  getById,

};
