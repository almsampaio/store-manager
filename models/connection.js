const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = process.env.DB_NAME || 'StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db;

const connection = async () => {
  if (db) return Promise.resolve(db);

  const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
  db = await conn.db(DB_NAME);
  return db;
};

module.exports = connection;
