const getConnection = require('./connection');

const create = async (productsSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertMany([{ productsSold }]);
  const { _id } = result.ops[0];
  return ({ _id, itensSold: productsSold });
};

module.exports = {
  create,
};
