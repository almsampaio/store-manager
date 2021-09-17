const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const SETTINGS = { useNewUrlParser: true, useUnifiedTopology: true };

const connection = async () => {
  let db = null;
  if (MONGO_DB_URL) {
    // console.log('iniciando conexão...');
    db = await MongoClient.connect(MONGO_DB_URL, SETTINGS)
      .then((conexs) => conexs.db(DB_NAME));
  }

  if (db) {
    // console.log('Conexão já foi estabelecida anteriormente!');
    return Promise.resolve(db);
  }
  return Promise.reject(new Error('Something went wrong with DB connection'));
};

module.exports = connection;