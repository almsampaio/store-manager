const { ObjectId } = require('mongodb');
const connection = require('../connection');

class GetSaleModel {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    const db = await connection();

    const saleCollection = await db.collection('sales');

    const sale = await saleCollection.findOne(new ObjectId(this.id));

    if (!sale) return null;

    return sale;
  }
}

module.exports = GetSaleModel;
