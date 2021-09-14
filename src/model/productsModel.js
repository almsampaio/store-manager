const mongoConnection = require('./connection');

module.exports = {
  async create(name, quantity) {
    const db = await mongoConnection();
    const productCollection = await db.collection('products');

    const newProduct = await productCollection.insertOne({ name, quantity });

    return { _id: newProduct.insertedId, name, quantity };
  },

  async findOne(name) {
    const db = await mongoConnection();
    const productCollection = await db.collection('products');

    const product = await productCollection.findOne({ name });

    return product;
  },
};
