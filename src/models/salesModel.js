// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ itensSold });

  const result = await sales.ops[0];
  console.log(result);
  return result; 
};

module.exports = { 
  create, 
  // findByName,
  // getAllProducts,
  // findById,
  // updateOne,
  // eliminate,
 };