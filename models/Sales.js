const connect = require('./connection');

module.exports = {
  async create(sales) {
    const db = await connect();
    const salesCreated = await db.collection('sales').insertOne({ itensSold: sales });
    return salesCreated.ops[0];
  },
};
