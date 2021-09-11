const connection = require('./models/connection');
require('dotenv').config();

const logIt = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((res) => console.log(res));
}

const logIt2 = () => {
  return console.log(process.env.DB_NAME);
}

logIt();
