const mongodb = require('mongodb').MongoClient;
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/StoreManager';

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

module.exports = () =>
  mongodb.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
