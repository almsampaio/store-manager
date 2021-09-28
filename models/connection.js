// const { MongoClient } = require('mongodb');

// require('dotenv').config();

// const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';

// const OPTIONS = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// const DB_NAME = 'StoreManager';

// let db = null;

// const connectionDb = () => (db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS))
//   .then((con) => {
//     db = con.db(DB_NAME);
//     return db;
//   });

//   module.exports = {
//     connectionDb,
//   };
const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/StoreManager';

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const DB_NAME = 'StoreManager';

let db = null;

const connectionDB = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
  .then((con) => {
    db = con.db(DB_NAME);
    return db;
  }));

module.exports = connectionDB;
