const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.listProduct);
app.get('/products/:id', productController.listProductId);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.excludeProduct);
app.post('/products', productController.addProduct);

app.post('/sales', salesController.addSale);
app.get('/sales', salesController.listSales);
app.get('/sales/:id', salesController.listSaleId);
app.put('/sales/:id', salesController.updateSales);

app.listen(3000, () => console.log('Project Store Manager'));