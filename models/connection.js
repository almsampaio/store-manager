const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// URL para testes locais
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

// URL para o evaluator

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
    }));

module.exports = connection;
