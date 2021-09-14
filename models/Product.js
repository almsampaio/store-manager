// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const zeroIndex = 0;

const create = async (name, quantity) =>
  connection()
    .then((db) =>
      db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[zeroIndex]);

    module.exports = {
      create,
    };

    const findByName = async (name) => {
      const query = { name };

      const product = await connection().then((db) =>
        db.collection('products').findOne(query));

      if (!product) return null;
    
      return product;
    };

    module.exports = {
      create,
      findByName,
    };