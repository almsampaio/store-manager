const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

const DEFAULT_PORT = '3000';

const PORT = process.env.PORT || DEFAULT_PORT;

app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

app.post('/products', productController.create);

app.put('/products/:id', productController.actualize);

app.delete('/products/:id', productController.remove);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.post('/sales', salesController.create);

app.put('/sales/:id', salesController.actualize);

app.post('/sales', salesController.create);

app.delete('/sales/:id', salesController.remove);

app.listen(PORT, () => {
  console.log('Servidor rodando');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
