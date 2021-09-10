const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let db = null;

const connection = async () => {
    if (db) return Promise.resolve(db);
    const con = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = await con.db(DB_NAME);
    return db;
};

module.exports = connection;