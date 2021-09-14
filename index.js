const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const productController = require('./controllers/productController');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
