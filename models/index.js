const create = async (connection, collection, payload) => {
  const cnt = await connection();
  const { ops: [insertedData] } = await cnt.collection(collection).insertOne({
    ...payload,
  });

  return insertedData;
};

module.exports = {
  create,
};
