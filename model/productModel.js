// Onde tem as queries - contato direto com o banco

const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const findName = await db.collection('products').findOne({ name });
  console.log(findName);
  if (findName) return { statusCode: 422 };
  const result = await db.collection('products').insertOne({ name, quantity });
  console.log(result);
  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  create,
};