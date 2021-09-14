const connection = require('./connection');

const create = async (collection, dataToBeInserted) => {
  const cnt = await connection();
  const insertedData = cnt.collection(collection).insertOne({
    ...dataToBeInserted,
  });

  return insertedData;
};

module.exports = {
  create,
};
