const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const data = await connection().then((db) => db.collection('products'));

  const alreadyExists = await data.find({ name }).toArray();

  if (alreadyExists.length === 0) {
    return data.insertOne({ name, quantity })
          .then((result) => ({ _id: result.insertedId, name, quantity }));
  }

  throw new Error('Product already exists');
};

module.exports = {
  addProduct,
};
