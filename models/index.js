const { ObjectId } = require('mongodb');

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

const findProductByName = async (connection, collection, searchString) => {
  const cnt = await connection();
  const searchResult = await cnt.collection(collection).findOne({
    name: searchString,
  });

  return searchResult;
};

const getAll = async (connection, collection) => {
  const cnt = await connection();
  const prodArray = await cnt.collection(collection).find().toArray();

  return prodArray;
};

const getByID = async (connection, collection, mongoID) => {
  const cnt = await connection();
  const product = await cnt.collection(collection)
    .find({ _id: ObjectId(mongoID) }).toArray();

  return product;
};

const updateByID = async (connection, collection, mongoID, updatePayload) => {
  const cnt = await connection();
  const update = await cnt.collection(collection)
    .updateOne({ _id: ObjectId(mongoID) }, { $set: { ...updatePayload } });

  return update;
};

module.exports = {
  create,
  getAll,
  getByID,
  updateByID,
  findProductByName,
};
