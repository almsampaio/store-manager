const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/Products');
const salesController = require('./controllers/Sales');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`iniciando o projeto na porta ${PORT}`);
});

// endpoint para products
app.post('/products', productsController.addProduct);
app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.put('/products/:id', productsController.updateProduct);
app.delete('/products/:id', productsController.deleteProduct);

// endoints para sales
app.post('/sales', salesController.addSales);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.put('/sales/:id', salesController.updateSales);
app.delete('/sales/:id', salesController.deleteSales);
