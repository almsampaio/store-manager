const express = require('express');

const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products/', productsController.createProduct);

app.get('/products/', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductsId);
app.put('/products/', productsController.putProducts);
app.put('/products/:id', productsController.putProducts);
app.delete('/products/', productsController.deleteProducts);
app.delete('/products/:id', productsController.deleteProducts);

app.post('/sales/', salesController.createSale);

app.get('/sales/', salesController.getAllSales);
app.get('/sales/:id', salesController.getSalesById);

app.put('/sales/', salesController.putSales);
app.put('/sales/:id', salesController.putSales);
app.delete('/sales/:id', salesController.deleteSales);

app.listen(3000, () => { console.log('Ouvindo na porta 3000'); });
