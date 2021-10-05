const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/ProductController');
const SaleController = require('./controllers/SaleController');

// const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.delete('/sales/:id', SaleController.deleteById);
// app.put('/sales/:id', SaleController.update);
app.get('/sales/:id', SaleController.getById);
app.get('/sales', SaleController.getAll);
app.post('/sales', SaleController.create);

app.delete('/products/:id', ProductController.deleteById);
app.put('/products/:id', ProductController.update);
app.get('/products/:id', ProductController.getById);
app.get('/products', ProductController.getAll);
app.post('/products', ProductController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('ok');
});

app.listen(PORT);
