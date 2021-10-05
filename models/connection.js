const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'StoreManager';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME));
module.exports = connection;