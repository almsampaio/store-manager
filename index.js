const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.createProduct);

app.put('/products/:id', productsController.updateProduct);

app.delete('/products/:id', productsController.excludeProduct);

app.get('/sales', salesController.getAllSales);

app.get('/sales/:id', salesController.getSalesById);

app.post('/sales', salesController.createSale);

app.put('/sales/:id', salesController.updateSale);

app.delete('/sales/:id', salesController.removeSale);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Online at PORT: ${PORT}`);
});
