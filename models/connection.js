const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Para os github
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

// Para o BD local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
let db = null;

const connection = async () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db('StoreManager');
        return db;
      }));

module.exports = connection;
