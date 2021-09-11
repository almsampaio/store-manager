const { ObjectId } = require('mongodb');
const connection = require('../connection');

class DeleteProductModel {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    const db = await connection();

    const productId = new ObjectId(this.id);

    const productCollection = await db.collection('products');

    const { value } = await productCollection.findOneAndDelete({ _id: productId });

    return value;
  }
}

module.exports = DeleteProductModel;
