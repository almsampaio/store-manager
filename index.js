const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');
const salesController = require('./controller/salesControler');

const app = express();
const SERVER_PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// products
app.post('/products', productController.addProduct);
app.get('/products/:id', productController.getProductById);
app.get('/products', productController.getProducts);
app.put('/products/:id', productController.updateProductById);
app.delete('/products/:id', productController.deleteProductById);

// sales
app.post('/sales', salesController.addSale);
app.get('/sales/:id', salesController.getSaleById);
app.get('/sales', salesController.getSales);
app.put('/sales/:id', salesController.updateSaleById);
// app.delete('/sales/:id', salesController.deleteSalesById);

app.listen(SERVER_PORT, () => console.log(`Servidor rodando na porta: ${SERVER_PORT}`));
