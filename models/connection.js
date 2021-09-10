const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const SETTINGS = { useNewUrlParser: true, useUnifiedTopology: true };

const connection = async () => {
  let db = null;
  if (MONGO_DB_URL) {
    db = await MongoClient.connect(MONGO_DB_URL, SETTINGS)
    .then((conn) => conn.db(DB_NAME));
  }

  if (db) {
    return Promise.resolve(db);
  } 
    return Promise.reject(new Error('Something went wrong with DB connection'));
};

module.exports = connection;

// Source:
// https://stackoverflow.com/questions/59496986/can-not-read-property-then-of-undefined-in-node-js
// https://stackoverflow.com/questions/26020578/should-a-promise-reject-message-be-wrapped-in-error
// https://trybecourse.slack.com/archives/C01L16B9XC7/p1631296337060200
