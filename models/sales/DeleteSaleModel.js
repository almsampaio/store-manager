const { ObjectId } = require('mongodb');
const connection = require('../connection');

class DeleteSaleModel {
  async handle(id) {
    const db = await connection();

    const saleId = new ObjectId(id);

    const salesCollection = await db.collection('sales');

    const { value } = await salesCollection.findOneAndDelete({ _id: saleId });

    if (!value) return null;

    return value;
  }
}

module.exports = DeleteSaleModel;
