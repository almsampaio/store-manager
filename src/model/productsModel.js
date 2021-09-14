const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

module.exports = {
  async create(name, quantity) {
    const db = await mongoConnection();
    const productCollection = await db.collection('products');

    const newProduct = await productCollection.insertOne({ name, quantity });

    return { _id: newProduct.insertedId, name, quantity };
  },

  async findAll() {
    const db = await mongoConnection();
    const productCollection = await db.collection('products');

    const products = await productCollection.find({}).toArray();

    return products;
  },

  async findOne(name) {
    const db = await mongoConnection();
    const productCollection = await db.collection('products');

    const product = await productCollection.findOne(name);

    return product;
  },

  async find(id) {
    const db = await mongoConnection();
    const productCollection = await db.collection('products');

    const product = await productCollection
      .findOne({ _id: ObjectId(id) });

    return product; 
  },

  async update(id, name, quantity) {
    const db = await mongoConnection();
    const productCollection = await db.collection('products');

    await productCollection
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return {
      _id: id,
      name,
      quantity,
    };
  },

  async delete(id) {
    const db = await mongoConnection();
    const productCollection = await db.collection('products');

    const product = await productCollection
      .findOne({ _id: ObjectId(id) }, { name: 1, quantity: 1 });

    if (product) {
      await productCollection
      .deleteOne({ _id: ObjectId(id) });
  
      return product;
    }
  }, 
};
