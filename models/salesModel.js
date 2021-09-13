const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectID(id) });
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = db.collection('sales').find().toArray();
  return result;
};

// const updateProductQuantity = async (prodId, qtd) => {
//   const db = await connection();
//   const { quantity } = getById(ObjectID(id));
//   await db.collection('sales').updateOne({ _id: ObjectID(id) },
//    { $set: { quantity: quantity - qtd } },
//   console.log(result);
// }; 

const create = async (sale) => {
  const itens = { itensSold: sale };
  // const { productId, quantity } = sale;
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne(itens);
  // await updateProductQuantity(productId, quantity);
  return { _id: insertedId, itensSold: sale };
};

const update = async (id, prodId, qtd) => {
  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectID(id) },
    { $set: { 'itensSold.$[element].quantity': qtd } },
    { arrayFilters: [{ 'element.productId': prodId }] });
  const result = await getById(ObjectID(id));
  return result;
};

const remove = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectID(id) });
  return true;
};

module.exports = {
  getById,
  getAll,
  create,
  update,
  remove,
};
