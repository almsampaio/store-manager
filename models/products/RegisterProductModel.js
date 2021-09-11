const connection = require('../connection');

class RegisterProductModel {
  constructor({ name, quantity }) {
    this.name = name;
    this.quantity = quantity;
  }

  async handle() {
    const db = await connection();

    const productsCollection = await db.collection('products');

    const { insertedId } = await productsCollection.insertOne({
      name: this.name,
      quantity: this.quantity,
    });

    return { _id: insertedId, name: this.name, quantity: this.quantity };
  }
}

module.exports = RegisterProductModel;
