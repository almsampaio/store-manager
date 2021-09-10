const connect = require('./connection');

module.exports = {
  async create(name, quantity) {
    const db = await connect();
    const product = await db.collection('product').insertOne({ name, quantity });
    return { id: product.insertedId, name, quantity };
  },
};
