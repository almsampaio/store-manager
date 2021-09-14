const getConnection = require('./connections');

const create = async (name, quantity) => getConnection()
.then((db) => db.collection('products').insertOne({
    name, quantity,
  }).then((result) => result.ops[0]));

  const getName = async (name) => getConnection()
  .then((db) => db.collection('products').findOne({ name }));

module.exports = {
  create,
  getName,
};
