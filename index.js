const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');
const saleController = require('./controller/saleController');
const validationNameAndQuantity = require('./middlewares/validateProducts');
const validationIDAndQuantity = require('./middlewares/validateSales');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Products

app.post('/products', validationNameAndQuantity, productController.create);
app.get('/products/:id', productController.getById);
app.get('/products', productController.getAll);
app.put('/products/:id', validationNameAndQuantity, productController.update);
app.delete('/products/:id', productController.exclude);

// Sales

app.post('/sales', validationIDAndQuantity, saleController.create);
app.get('/sales/:id', saleController.getById);
app.get('/sales', saleController.getAll);
app.put('/sales/:id', validationIDAndQuantity, saleController.update);
app.delete('/sales/:id', saleController.exclude);

app.listen(3000, () => console.log('Olha noix ai na porta 3000'));
