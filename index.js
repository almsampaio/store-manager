const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = require('express')();
require('dotenv').config();

const routes = require('./routes');

const PORT = 3000;

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Online on http://localhost:${PORT}/`);
});

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';

const main = async () => {
  await mongoose.connect(MONGO_DB_URL);
};
main().catch(console.error);
