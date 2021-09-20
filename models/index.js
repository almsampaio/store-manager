/**
 * Simple create function to register data at the DB.
 * @param {function} connection The connection DB obj.
 * @param {string} collection String with the name of the Mongo Collection.
 * @param {object} payload The object you want input on the DB.
 * @returns The data inserted on the DB with the ID designated by the DB 
 */
const create = async (connection, collection, payload) => {
  const cnt = await connection();
  const { ops: [insertedData] } = await cnt.collection(collection).insertOne({
    ...payload,
  });

  return insertedData;
};

const findByName = async (connection, collection, searchString) => {
  const cnt = await connection();
  const searchResult = await cnt.collection(collection).findOne({
    name: searchString,
  });

  return searchResult;
};

module.exports = {
  create,
  findByName,
};
