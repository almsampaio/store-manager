const Connection = require('./connection');

const create = async (name, quantity) => {
    const db = await Connection();
    const result = await db.collection('products').insertOne({ name, quantity });
    return { _id: result.insertedId, name, quantity };
  };
module.exports = create;
