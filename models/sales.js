const connection = require('../connection');

const modelGetAll = async () => {
  const db = await connection();
  const elements = db.collection('sales').find().toArray();
  return elements;
};

module.exports = {
  modelGetAll,
};
