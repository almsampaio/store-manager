const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

const productsController = require('./controllers/products');

app.route('/products/:id')
  .get(productsController.getProductById)
  .put(productsController.updateProduct)
  .delete(productsController.deleteById);

app.route('/products')
  .post(productsController.createProduct)
  .get(productsController.getProducts);

const salesController = require('./controllers/sales');

app.route('/sales/:id')
  .get(salesController.getSalesById)
  .put(salesController.updateSale)
  .delete(salesController.deleteSale);

app.route('/sales')
  .post(salesController.createSales)
  .get(salesController.getSales);

const error = require('./middleware/error');

app.use(error);

app.listen(PORT, () => console.log(`Running at ${PORT} port`));
