const express = require('express');
const bodyParse = require('body-parser');

const validates = require('./middlewares');
const { createProduct, getAllProducts, findById } = require('./controllers/products');

const PORT = '3000';
const app = express();

const {
  validateProductName,
  validateProductQty,
  validateId,
} = validates;

app.use(bodyParse.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProductName, validateProductQty, createProduct);
app.get('/products/:id', validateId, findById);
app.get('/products', getAllProducts);

app.listen(PORT, () => {
  console.log('hello world');
});
