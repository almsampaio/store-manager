const express = require('express');
const bodyParse = require('body-parser');

const validates = require('./middlewares');
const { createProduct } = require('./controllers/products');

const PORT = '3000';
const app = express();

const {
  validateProductName,
  validateProductQty,
} = validates;

app.use(bodyParse.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProductName, validateProductQty, createProduct);

app.listen(PORT, () => {
  console.log('hello world');
});
