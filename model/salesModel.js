const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertMany([{ itensSold }]);
  const { _id } = result.ops[0];
  return ({ _id, itensSold });
};

module.exports = {
  create,
};