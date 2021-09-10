const { ObjectId } = require('mongodb');
const connection = require('../connection');

class GetSaleModel {
  async handle(id) {
    const db = await connection();

    const saleCollection = await db.collection('sales');

    const sale = await saleCollection.findOne(new ObjectId(id));

    if (!sale) return null;

    return sale;
  }
}

module.exports = GetSaleModel;
