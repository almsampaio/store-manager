const express = require('express');
const bodyParser = require('body-parser');

const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');
const validations = require('./validations');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// products routes
app.post('/products', 
  validations.validateName, 
  validations.validateQuantity,
  productsControllers.add);

app.get('/products', productsControllers.getAll);

app.get('/products/:id', productsControllers.getById);

app.put('/products/:id', 
  validations.validateName, 
  validations.validateQuantity,
  productsControllers.update);

app.delete('/products/:id', productsControllers.remove);

// sales routes
app.post('/sales', 
  validations.validateQuantitySales, 
  productsControllers.add);

app.get('/sales', salesControllers.getAll);

app.get('/sales/:id', salesControllers.getById);

app.put('/sales/:id', 
  validations.validateQuantitySales, 
  salesControllers.update);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`App online at port ${PORT}`);
});