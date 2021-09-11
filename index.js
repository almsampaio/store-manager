const express = require('express');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/productControllers');
const salesControllers = require('./controllers/salesControllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Online');
});

app.post('/products', productsControllers.create);
app.get('/products', productsControllers.getAll);
app.get('/products/:id', productsControllers.getById);
app.put('/products/:id', productsControllers.updateById);
app.delete('/products/:id', productsControllers.removeById);

app.post('/sales', salesControllers.create);
app.get('/sales', salesControllers.getAll);
app.get('/sales/:id', salesControllers.getById);
