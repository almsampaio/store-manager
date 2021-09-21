// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager'; // local

// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';  -- avaliador

const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const db = null;

const connection = () => (db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS))
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
        console.error(err);
        process.exit();
    });

module.exports = connection;