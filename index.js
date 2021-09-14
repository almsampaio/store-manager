const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);
app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.getById);
app.put('/products/:id', ProductsController.update);
app.delete('/products/:id', ProductsController.exclude);

app.post('/sales', SalesController.create);
app.get('/sales', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);
app.put('/sales/:id', SalesController.update);
// app.delete('/sales/:id', SalesController.exclude);

app.listen(3000, () => console.log('WoPhi!'));