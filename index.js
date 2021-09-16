const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products')
  .get(productController.getAll)
  .post(productController.createProduct);

app
  .route('/products/:id')
  .get(productController.getById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

app.route('/sales')
  .get(saleController.getAll)
  .post(saleController.createSale);

  app
  .route('/sales/:id')
  .get(saleController.getById)
  .put(saleController.updateSale);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
