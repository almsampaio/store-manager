const { ObjectId } = require('mongodb');
const connection = require('../connection');

class UpdateProductBySaleModel {
  async handle({ productId, quantity: quantitySold }, dec = true) {
    const OPTION_UPDATE = dec
      ? { $inc: { quantity: -Number(quantitySold) } }
      : { $inc: { quantity: Number(quantitySold) } };

    const db = await connection();

    const id = new ObjectId(productId);

    const productCollection = await db.collection('products');

    const { value } = await productCollection
      .findOneAndUpdate({ _id: id }, OPTION_UPDATE);

    return value;
  }
}

module.exports = UpdateProductBySaleModel;
