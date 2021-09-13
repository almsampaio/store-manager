// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./src/Controllers/productsController');

const app = express();

app.use(bodyParser.json());

const PORT = '3000';

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getProductById);

app.post('/products', productsController.addProduct);

app.listen(PORT, () => {
  console.log('Online');
});
