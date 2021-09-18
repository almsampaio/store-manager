const Connection = require('../../config/databaseMongo');

const create = async (products) => {
  const mongo = await Connection();
  const result = await mongo.collection('sales').insertMany([
    {
      itensSold: [...products],
    },
  ]);

  const [salesSaved] = result.ops;
  console.log(result);

  return { _id: result.insertedIds[0], ...salesSaved };
};

module.exports = {
  create,
};
