const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';

let schema = null;

module.exports = {
  getConnection() {
    if (schema) return Promise.resolve(schema);
    return MongoClient
      .connect(MONGO_DB_URL, mongoConfig)
      .then((conn) => conn.db('model_example'))
      .then((dbSchema) => {
        schema = dbSchema;
        return schema;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};