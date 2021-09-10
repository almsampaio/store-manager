const { MongoClient } = require('mongodb');

require('dotenv').config();

const Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL_TEST = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const MONGO_DB_URL = process.env.MONGO_DB_URL_LOCAL || MONGO_DB_URL_TEST;

let db = null;

const connection = () => (
  db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, Options)
  .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  }));

module.exports = connection;