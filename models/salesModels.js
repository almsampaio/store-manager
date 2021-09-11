const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');
const productModels = require('./productModels');

const idProductIsValid = async (arrayParam) => {
  let invalidProducts = 0;
  Promise.all(arrayParam.map(async (obj) => {
    const product = await productModels.getById(obj.productId);
    if (!product) invalidProducts += 1;
  }));
  if (invalidProducts > 0) return false;
  return true;
};

const create = async (products) => {
  const exists = idProductIsValid(products);
  if (!exists) return null;

  const db = await mongoConnection.getConnection();
  
  let check = 0;
  await Promise.all(products.map(async (obj) => {
    check += await productModels.updateQuantity(obj.productId, obj.quantity);
  }));

  if (check > 0) return null;

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

const updateById = async (idParam, productId, quantity) => {
  const isValid = ObjectId.isValid(idParam);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  await db.collection('sales').updateOne(
    { 
      _id: ObjectId(idParam), 
      'itensSold.productId': productId, 
      'itensSold.quantity': quantity,
    },
    { $set: { productId, quantity } },
  );

  return {
    _id: idParam,
    itensSold: [{ productId, quantity }],
  };
};

const removeById = async (idParam) => {
  const sale = await getById(idParam);
  if (!sale) return null;
  const db = await mongoConnection.getConnection();
  const getSale = await getById(idParam);
  getSale.itensSold.forEach(async (obj) => {
    await productModels.cancelSale(obj.productId, obj.quantity);
  });

  await db.collection('sales').deleteOne({ _id: ObjectId(idParam) });
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  removeById,
};
