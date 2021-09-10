const connection = require('../connection');

class GetProductByName {
  async handle(name) {
    const db = await connection();

    const productsCollection = await db.collection('products');

    const product = productsCollection.findOne({ name });

    if (!product) return null;

    return product;
  }
}

module.exports = GetProductByName;
