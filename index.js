const express = require('express');

const products = require('./controller/products');

const app = express();
const PORT = 3000;

app.use(express.json());

app.route('/products')
  .get(products.getAll)
  .post(products.createProducts);

  app.route('/products/:id')
  .get(products.getByIdProducts)
  .put(products.update)
  .delete(products.productDeletes);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('App ouvindo a porta 3000'));
