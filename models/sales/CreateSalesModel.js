const connection = require('../connection');

class CreateSalesModel {
  async handle(sale) {
    const db = await connection();

    const salesCollection = await db.collection('sales');

    const { insertedId } = await salesCollection.insertOne(sale);

    return { _id: insertedId, ...sale };
  }
}

module.exports = CreateSalesModel;
