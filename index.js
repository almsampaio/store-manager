const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/ProductsController');
const salesController = require('./controllers/SalesController');
const { validateName, validateQuantity } = require('./middlewares/productsValidation');
const { validQuantity } = require('./middlewares/salesValidation');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateName, validateQuantity, productController.create);
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.put('/products/:id', validateName, validateQuantity, productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', validQuantity, salesController.createSale);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.put('/sales/:id', validQuantity, salesController.updateSale);
app.delete('/sales/:id', salesController.deleteSale);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
