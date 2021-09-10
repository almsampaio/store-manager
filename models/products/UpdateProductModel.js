const { ObjectId } = require('mongodb');
const connection = require('../connection');

class UpdateProductModel {
  async handle({ id, name, quantity }) {
    const db = await connection();

    const productCollection = await db.collection('products');

    const productId = new ObjectId(id);

    await productCollection.findOneAndUpdate(
      { _id: productId },
      { $set: { name, quantity } },
      { returnDocument: 'after' },
    );

    return { _id: productId, name, quantity };
  }
}

module.exports = UpdateProductModel;
