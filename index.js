const express = require('express');
const bodyParser = require('body-parser').json();

const error = require('./src/middlewares/error');

require('dotenv').config();

const { products, sales } = require('./src/routes');

// const { PORT } = process.env;
const PORT = 3000;

const app = express();

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use('/sales', sales);

app.use(error);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});