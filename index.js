const express = require('express');

const products = require('./controller/products');

const app = express();
const PORT = 3000;

app.use(express.json());

app.route('/products')
  .get()
  .post(products.createProducts);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('App ouvindo a porta 3000'));
