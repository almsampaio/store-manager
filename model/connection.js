const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => {
    return MongoClient
        .connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((conn) => conn.db(DB_NAME))
        .catch((err) => {
          console.error(err);
          process.exit();
        });
};

module.exports = connection;