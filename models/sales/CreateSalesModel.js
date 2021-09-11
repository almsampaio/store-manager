const connection = require('../connection');

class CreateSalesModel {
  constructor(sale) {
    this.sale = sale;
  }

  async handle() {
    const db = await connection();

    const salesCollection = await db.collection('sales');

    const { insertedId } = await salesCollection.insertOne(this.sale);

    return { _id: insertedId, ...this.sale };
  }
}

module.exports = CreateSalesModel;
