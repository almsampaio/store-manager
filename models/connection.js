const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const getConnection = () => MongoClient
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

module.exports = { getConnection };
