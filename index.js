const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

const Products = require('./controllers/products');
const Sales = require('./controllers/sales');

app.get('/products', Products.getAll);
app.get('/products/:id', Products.getById);
app.post('/products', Products.create);
app.put('/products/:id', Products.update);
app.delete('/products/:id', Products.exclude);

app.get('/sales', Sales.getAll);
app.get('/sales/:id', Sales.getById);
app.post('/sales', Sales.create);
app.put('/sales/:id', Sales.update);
app.delete('/sales/:id', Sales.exclude);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Ouvindo na porta 3000'));
