const connection = require('../connection');

class GetProductByName {
  constructor(name) {
    this.name = name;
  }

  async handle() {
    const db = await connection();

    const productsCollection = await db.collection('products');

    const product = productsCollection.findOne({ name: this.name });

    if (!product) return null;

    return product;
  }
}

module.exports = GetProductByName;
