const express = require('express');
const bodyParser = require('body-parser');
const { validateName, validateQuantity } = require('./services/productService');
const { validateQuantitySale } = require('./services/saleSercive');

const productController = require('./controllers/productController');
const salesController = require('./controllers/saleController');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.post('/products', validateName, validateQuantity, productController.register);
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.put('/products/:id', validateName, validateQuantity, productController.update);
app.delete('/products/:id', productController.remove);
app.post('/sales', validateQuantitySale, salesController.register);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.put('/sales/:id', validateQuantitySale, salesController.update);

app.listen(PORT, () => {
  console.log('🚀 Segura que nossa app tá rodando!');
});

app.get('/', (_request, response) => {
  response.send();
});
