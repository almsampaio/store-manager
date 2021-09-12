const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let dbcon = null;

const connection = () => (dbcon
     ? Promise.resolve(dbcon) : MongoClient.connect(MONGO_DB_URL, OPTIONS)
.then((connect) => {
    dbcon = connect.db_state(DB_NAME);
    return dbcon;
}));

module.exports = connection;
