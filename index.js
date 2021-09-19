const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const productController = require('./controlers/productController');

const app = express();

const PORT = '3000';

app.use(bodyParser.json());

app.post('/products', rescue(productController.addProduct));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const { status, result } = err;
  res.status(status).json(result);
});

app.listen(PORT, () => {
  console.log('Online');
});