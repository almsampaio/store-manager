const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.get('/products', productsController.getAll);
app.get('/sales', salesController.getAll);

app.get('/products/:id', productsController.getById);
app.get('/sales/:id', salesController.getById);

app.put('/products/:id', productsController.updateProduct);
app.put('/sales/:id', salesController.updateSale);

app.post('/products', productsController.create);
app.post('/sales', salesController.create);

app.delete('/products/:id', productsController.deleteProduct);
app.delete('/sales/:id', salesController.deleteSale);

app.listen(PORT, () => console.log('Servidor no ar!'));
