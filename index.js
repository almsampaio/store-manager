const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsControlers');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.put('/products/:id', productsController.editById);
app.delete('/products/:id', productsController.deleteById);
app.post('/products', productsController.create);

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.post('/sales', salesController.create);
app.delete('/sales/:id', salesController.deleteById);

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});