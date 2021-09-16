const bodyParser = require('body-parser');
const express = require('express');
const productsController = require('./controllers/productsControler');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.delete('/sales/:id', salesController.remove);
app.put('/sales/:id', salesController.update);
app.get('/sales/:id', salesController.find);
app.get('/sales', salesController.getAll);
app.post('/sales', salesController.create);

app.delete('/products/:id', productsController.remove);
app.put('/products/:id', productsController.editProduct);
app.get('/products/:id', productsController.getProductById);
app.post('/products', productsController.create);
app.get('/products', productsController.getAll);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Rodando certinho'));
