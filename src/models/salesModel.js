const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ itensSold });

  const result = await sales.ops[0];
  // console.log(result);
  return result; 
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  const sale = await db.collection('sales').findOne(new ObjectId(id));

  if (!sale) return null;

  return sale;
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
 
  return {
    sales,
  };
};

const updateOne = async (id, itenSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  
  const [{ productId, quantity }] = itenSold;

  const db = await connection();
  await db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: { productId, quantity } } });
  console.log('porra');
  
  const newProduct = {
    _id: id,
    itensSold: [{
    productId,
    quantity,
    }],
  };

  return newProduct;
};

module.exports = { 
  create, 
  // findByName,
  getAllSales,
  findById,
  updateOne,
  // eliminate,
 };