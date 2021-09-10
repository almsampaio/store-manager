const { ObjectId } = require('mongodb');
const connection = require('../connection');

class GetProductByIdModel {
  async handle(id) {
    const db = await connection();

    const productsCollection = await db.collection('products');

    const productById = await productsCollection.findOne(new ObjectId(id));

    if (!productById) return null;

    return productById;
  }
}

module.exports = GetProductByIdModel;
