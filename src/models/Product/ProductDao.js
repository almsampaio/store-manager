const Connection = require('../../config/databaseMongo');

async function findByName(name) {
  const mongo = await Connection();
  return mongo.collection('products').findOne({ name });
}

async function create(product) {
  const mongo = await Connection();
  const result = await mongo.collection('products').insertOne(product);

  const [productSaved] = result.ops;

  return productSaved;
}

module.exports = {
  findByName,
  create,
};
