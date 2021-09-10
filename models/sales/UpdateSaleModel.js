const { ObjectId } = require('mongodb');
const connection = require('../connection');

class UpdateSaleModel {
  async handle(id, sales) {
    const db = await connection();

    const salesCollection = db.collection('sales');

    const saleId = new ObjectId(id);

    const { value } = await salesCollection.findOneAndUpdate(
      { _id: saleId },
      { $set: { itensSold: sales } },
      { returnDocument: 'after' },
    );

    return value;
  }
}

module.exports = UpdateSaleModel;
