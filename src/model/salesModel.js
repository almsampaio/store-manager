const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

module.exports = {
  async create(sales) {
    const db = await mongoConnection();
    const salesCollection = await db.collection('sales');

    const insertedSaleId = await salesCollection.insertOne({ itensSold: sales });

    const { _id } = insertedSaleId.ops[0];

    return {
      id: _id,
    };
  },

  async findAll() {
    const db = await mongoConnection();
    const salesCollection = await db.collection('sales');

    const sales = await salesCollection.find({}).toArray();

    return sales;
  },

  async findOne(name) {
    const db = await mongoConnection();
    const salesCollection = await db.collection('sales');

    const sales = await salesCollection.findOne(name);

    return sales;
  },

  async find(id) {
    const db = await mongoConnection();
    const salesCollection = await db.collection('sales');

    const sales = await salesCollection
      .findOne({ _id: ObjectId(id) });

    return sales; 
  },

  async update(id, name, quantity) {
    const db = await mongoConnection();
    const salesCollection = await db.collection('sales');

    await salesCollection
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return {
      _id: id,
      name,
      quantity,
    };
  },

  async delete(id) {
    const db = await mongoConnection();
    const salesCollection = await db.collection('sales');

    const sales = await salesCollection
      .findOne({ _id: ObjectId(id) }, { name: 1, quantity: 1 });

    if (sales) {
      await salesCollection
      .deleteOne({ _id: ObjectId(id) });
  
      return sales;
    }
  }, 
};
