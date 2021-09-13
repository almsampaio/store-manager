const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017';
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