const { ObjectId } = require('mongodb');
const connection = require('../connection');

class DeleteProductModel {
  async handle(id) {
    const db = await connection();

    const productId = new ObjectId(id);

    const productCollection = await db.collection('products');

    const { value } = await productCollection.findOneAndDelete({ _id: productId });

    return value;
  }
}

module.exports = DeleteProductModel;
