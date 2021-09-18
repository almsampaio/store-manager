const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';
// Para os testes locais funcionarem descomente as linhas acima.

// Para o avaliador funcionar descomente as linhas abaixo:
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connections = async () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => connection.db(DB_NAME))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  module.exports = connections;
