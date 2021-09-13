const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Requisito 01
app.post('/products', ProductsController.create);

// Requisito 02
app.get('/products/', ProductsController.getAll);
app.get('/products/:id', ProductsController.getById);

// Requisito 03
app.put('/products/:id', ProductsController.update);

// Requisito 04
app.delete('/products/:id', ProductsController.remove);

// Requisito 05
app.post('/sales', SalesController.create);

// Requisito 06
app.get('/sales/', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);

// Requisito 07
app.put('/sales/:id', SalesController.update);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
