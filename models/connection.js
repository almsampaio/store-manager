const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Para rodar localmente
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// Para o avaliador funcionar
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

let db = null;

const connection = () => (db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS)
        .then((con) => {
            db = con.db(DB_NAME);
            return db;
        }));

module.exports = connection;
