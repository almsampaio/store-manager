const connection = require('../connection');

class GetAllProductsModel {
  async handle() {
    const db = await connection();

    const productsCollection = await db.collection('products');

    const allProducts = productsCollection.find({}).toArray();

    return allProducts;
  }
}

module.exports = GetAllProductsModel;
