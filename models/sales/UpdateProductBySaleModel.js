const { ObjectId } = require('mongodb');
const connection = require('../connection');

class UpdateProductBySaleModel {
  constructor(sale) {
    this.sale = sale;
  }

  async handle(dec = true) {
    const { productId, quantity: quantitySold } = this.sale;

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
