const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const {
  getAllProducts,
  createNewProduct,
  getById,
  updateProduct,
  deleteProduct,
} = require('./controllers/products');

const sales = require('./controllers/sales');

const { validName, validQuantity, validQuantitySales } = require('./utils/validations/validations');

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} xablau`);
});

app.post('/products', validName, validQuantity, createNewProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', getById);
app.put('/products/:id', validName, validQuantity, updateProduct);
app.delete('/products/:id', deleteProduct);

app.post('/sales', validQuantitySales, sales.create);
app.get('/sales', sales.getAll);
app.get('/sales/:id', sales.getById);
app.put('/sales/:id', validQuantitySales, sales.update);
app.delete('/sales/:id', sales.deleteSale);