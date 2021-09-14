const connect = require('./connection');

module.exports = {
  async create(name, quantity) {
    const db = await connect();
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  },

  get: {
    async byName(value) {
      const db = await connect();
      const product = await db.collection('products').findOne({ name: value });
      return product || null;
    },
  },
};
