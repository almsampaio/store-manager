const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const getConnection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(process.env.MONGO_DB_URL || MONGO_DB_URL, OPTIONS)
  .then((conn) => {
    db = conn.db(process.env.DB_NAME || DB_NAME);
    console.log('Database Connected');
    return db;
  })
  .catch((error) => {
    console.log('Database connectivity Error ===', error);
    throw new Error(error);
  })
);

module.exports = getConnection;
