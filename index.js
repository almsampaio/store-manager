const express = require('express');
const bodyParser = require('body-parser');
const { validateName, validateQuantity } = require('./services/productService');

const productController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.post('/products', validateName, validateQuantity, productController.register);
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.put('/products/:id', validateName, validateQuantity, productController.update);

app.listen(PORT, () => {
  console.log('🚀 Segura que nossa app tá rodando!');
});

app.get('/', (_request, response) => {
  response.send();
});
