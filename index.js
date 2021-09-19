const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const { validName, validQuantity } = require('./middlewares/productMiddleware');
const { validSalesQuantity } = require('./middlewares/salesMiddleware');

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validName, validQuantity, productController.create);
app.post('/sales', validSalesQuantity, salesController.createSale);
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.put('/products/:id', validName, validQuantity, productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.listen(PORT, () => {
  console.log('Listening to port', PORT);
});
