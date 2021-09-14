const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.get('/products', productController.getAll);

// app.get('/products/:id', productController.getById);

// app.post('/products', productController.create);

// app.put('/products/:id', productController.actualize);

// app.post('/products', productController.create);

// app.delete('/songs/:id', productController.remove);

// app.get('/products', salesController.getAll);

// app.get('/products/:id', salesController.getById);

// app.post('/products', salesController.create);

// app.put('/products/:id', salesController.actualize);

// app.post('/products', salesController.create);

// app.delete('/songs/:id', salesController.remove);

app.listen(PORT, () => {
  console.log('Servidor rodando');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
