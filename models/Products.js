const { ObjectId } = require('mongodb');
const connect = require('./connection');

module.exports = {
  async create(name, quantity) {
    const db = await connect();
    const product = await db.collection('product').insertOne({ name, quantity });
    return { id: ObjectId(product.id), name, quantity };
  },

  get: {
    async byName(value) {
      const db = await connect();
      const product = await db.collection('product').findOne({ name: value });
      return { id: ObjectId(product.id), name: product.name, quantity: product.quantity };
    },
  },
};
