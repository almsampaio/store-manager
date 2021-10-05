const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DB_NAME = 'StoreManager';
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true }

const getConnection = async () => {
  const DBServer = await MongoMemoryServer.create();
  const URLMock = DBServer.getUri();

  return MongoClient.connect(URLMock, OPTIONS)
    .then((connection) => connection.db(DB_NAME));
};

module.exports = {
  getConnection,
};