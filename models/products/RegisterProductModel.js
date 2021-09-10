const connection = require('../connection');

class RegisterProductModel {
  async handle({ name, quantity }) {
    const db = await connection();

    const productsCollection = await db.collection('products');

    const { insertedId } = await productsCollection.insertOne({ name, quantity });

    return { _id: insertedId, name, quantity };
  }
}

module.exports = RegisterProductModel;
