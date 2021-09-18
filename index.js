const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// conectando index com a camada controllers
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.get('/products', productsController.getAllProducts);
app.get('/sales', salesController.getAllSales);

app.get('/products/:id', productsController.getProductsByID);
app.get('/sales/:id', salesController.getSalesByID);

app.post('/products', productsController.postProduct);
app.post('/sales', salesController.postSale);

app.put('/products/:id', productsController.updateProductsByID);
app.put('/sales/:id', salesController.updateSalesByID);

app.delete('/products/:id', productsController.deleteProductByID);
app.delete('/sales/:id', salesController.deleteSaleByID);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Servidor Conectado!'));
