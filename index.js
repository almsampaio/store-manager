const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.createSale);
app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSaleById);

app.listen(PORT, () => {
  console.log('Online em:', PORT);
});