const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const {
  validateName,
  validateQuantity,
} = require('./middlewares/productsMiddlewares');
const { salesValidateQuantity } = require('./middlewares/salesMiddlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Products
app.post('/products', validateName, validateQuantity, productController.create);
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.put('/products/:id', validateName, validateQuantity, productController.update);
app.delete('/products/:id', productController.exclude);

// Sales
app.post('/sales', salesValidateQuantity, salesController.create);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);

app.listen(3000, () => {
  console.log('#vqv app rodando na 3000');
});
