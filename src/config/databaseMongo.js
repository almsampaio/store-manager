const { MongoClient } = require('mongodb');

const { MONGO_PORT } = require('./server');

const DB_NAME = 'StoreManager';
const URL = `mongodb://localhost:${MONGO_PORT}`;
const optionsMongoClient = { useNewUrlParser: true, useUnifiedTopology: true };

let database = null;

const connection = async () => {
  if (!database) {
    const client = await MongoClient.connect(URL, optionsMongoClient);
    database = client.db(DB_NAME);
    return database;
  }

  return Promise.resolve(database);
};

module.exports = connection;
