const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';
const OPTIONS = { useNewUrlParser: true, newUnifiedTopology: true };

module.exports = () => {
  MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((connection) => connection.db(DB_NAME))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};
