const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

module.exports = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(process.env.MONGO_DB_URL, OPTIONS)
  .then((conn) => {
    db = conn.db(process.env.DB_NAME);
    console.log('Database Connected');
    return db;
  })
  .catch((error) => {
    console.log('Database connectivity Error ===', error);
    throw new Error(error);
  })
);
