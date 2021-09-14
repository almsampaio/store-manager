const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const conn = () => MongoClient.connect(
  MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  )
  .then((connection) => connection.db(`${DB_NAME}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = conn;