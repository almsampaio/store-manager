// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const Product = require('./controllers/Product');
const Sales = require('./controllers/Sales');

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Product.getAllProducts);

app.get('/products/:id', Product.findById);

app.post('/products', Product.create);

app.put('/products/:id', Product.updateProduct);

app.delete('/products/:id', Product.deleteProduct);

app.post('/sales', Sales.create);

app.get('/sales', Sales.getAllSales);

app.get('/sales/:id', Sales.findById);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});