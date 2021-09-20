const mongoClient = require('mongodb').MongoClient;

const connection = async () => {
  const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; // Conexão para o avaliador
  // const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; // Conexão normal
  const DB_NAME = 'StoreManager';
  try {
    const connectionMongodb = await mongoClient.connect(MONGO_DB_URL);
    global.db = await connectionMongodb.db(DB_NAME);
    console.log(`Connection to mongodb - database ${DB_NAME}`);
    return global.db;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = connection;
