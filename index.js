const express = require('express');
const bodyParser = require('body-parser');

const productsModel = require('./models/productsModel');
const salesModel = require('./models/salesModel');

const app = express();
app.use(bodyParser.json());

console.log('Hello, World!');

app.get('/products', async (req, res) => {
  const products = await productsModel.getAll();
  res.status(200).json(products);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
});

app.get('/sales', async (req, res) => {
  const sales = await salesModel.getAll();
  res.status(200).json(sales);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
});

app.put('/sales/:id', async (req, res) => {
  const { id } = req.params;
});

app,put('/products/:id', async (req, res) => {
  const { id } = req.params;

});

app.post('/products', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsModel.create(name, quantity);
  res.status(201).json(product);
});

app.post('/sales', async (req, res) => {
  const { itensSold, quantity } = req.body;
  const sale = await salesModel.create(itensSold, quantity);
  res.status(201).json(sale);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3001, () => console.log('We are live!'));
