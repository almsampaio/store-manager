const { ObjectId } = require('mongodb');
const connection = require('../connection');

class UpdateProductModel {
  constructor({ id, name, quantity }) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
  }

  async handle() {
    const db = await connection();

    const productCollection = await db.collection('products');

    const productId = new ObjectId(this.id);

    await productCollection.findOneAndUpdate(
      { _id: productId },
      { $set: { name: this.name, quantity: this.quantity } },
      { returnDocument: 'after' },
    );

    return { _id: productId, name: this.name, quantity: this.quantity };
  }
}

module.exports = UpdateProductModel;
