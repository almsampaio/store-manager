const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsController = require('./controllers/products');

app.route('/products/:id')
  .get(productsController.getProductsById)
  .put(productsController.updateProduct)
  .delete(productsController.deleteById);

app.route('/products')
  .post(productsController.createProduct)
  .get(productsController.getProducts);

const salesController = require('./controllers/sales');

app.route('/sales')
  .post(salesController.createSales);

app.listen(PORT, () => console.log(`Running at ${PORT} port`));
