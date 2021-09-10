const express = require('express');
const bodyParser = require('body-parser');
const { validateName, validateQuantity } = require('./services/productService');

const productController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const PORT = '3001';

app.post('/product', validateName, validateQuantity, productController.register);

app.listen(PORT, () => {
  console.log('🚀 Segura que nossa app tá rodando!');
});

app.get('/', (_request, response) => {
  response.send();
});
