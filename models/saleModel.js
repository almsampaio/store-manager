const { getConnection } = require('./connection');

const SALES_COLLECTION = 'sales';

const create = async (sale) => {
  const document = {
    itensSold: sale,
  };
  const db = await getConnection();
  const result = await db.collection(SALES_COLLECTION).insertOne(document);
  const [savedSale] = result.ops;
  return savedSale;
};

module.exports = { create };
