const { MongoClient } = require('mongodb');

const { LOCAL_MONGO_DB_URL } = process.env;

const MONGO_DB_URL = LOCAL_MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((error) => {
    console.error(error);
    process.exit();
  });

module.exports = connection;
