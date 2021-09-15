const { ObjectId } = require('mongodb');
const connect = require('./connection');

module.exports = {
  async create(sales) {
    const db = await connect();
    const salesCreated = await db.collection('sales').insertOne({ itensSold: sales });
    return salesCreated.ops[0];
  },

  get: {
    async all() {
      const db = await connect();
      const sales = db.collection('sales').find({}).toArray();
      return sales;
    },

    async byId(id) {
      const db = await connect();
      const sale = db.collection('sales').findOne({ _id: ObjectId(id) });
      return sale;
    },
  },
};
