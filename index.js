const express = require('express');

const bodyParser = require('body-parser').json;

const productsController = require('./controllers/productsController');

const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getProductByID);

app.get('/sales', salesController.getAllSales);

app.get('/sales/:id', salesController.getSaleByID);

app.post('/products', productsController.createNewProduct);

app.post('/sales', salesController.createNewSales);

app.put('/products/:id', productsController.updateProductByID);

app.put('/sales/:id', salesController.updateSaleByID);

app.delete('/products/:id', productsController.deleteProductByID);

app.delete('/sales/:id', salesController.deleteSalestByID);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Online on PORT: ${PORT}`);
});
