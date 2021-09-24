const Connection = require('./connection');

// inclusão do produto 
const create = async (name, quantity) => {
    const db = await Connection();
    const result = await db.collection('products').insertOne({ name, quantity });
    return { _id: result.insertedId, name, quantity };
  };

// filtro pelo nome
const findByName = async (name) => {
  const db = await Connection();
  const product = db.collection('products').findOne({ name });
  return product;
};

module.exports = { create, findByName };
