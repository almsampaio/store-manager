const { ObjectId } = require('mongodb');
const connect = require('./connection');

module.exports = {
  async create(name, quantity) {
    const db = await connect();
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  },

  get: {
    async all() {
      const db = await connect();
      const products = await db.collection('products').find({}).toArray();
      return products || null;
    },

    async byId(value) {
      const db = await connect();
      const product = await db.collection('products').findOne({ _id: ObjectId(value) });
      return product;
    },

    async byName(value) {
      const db = await connect();
      const product = await db.collection('products').findOne({ name: value });
      return product || null;
    },
  },

  async update(id, body) {
    const { name, quantity } = body;
    const db = await connect();
    await db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    );
    return { _id: id, name, quantity };
  },

  async delete(id) {
    const db = await connect();
    await db.collection('products').deleteOne({ _id: ObjectId(id) });
  },
};
