const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/products/:id', productsController.getById);

app.put('/products/:id', productsController.update);

app.delete('/products/:id', productsController.remove);

app.get('/products', productsController.getAll);

app.post('/products', productsController.create);

app.get('/sales/:id', salesController.getById);

app.put('/sales/:id', salesController.update);

app.delete('/sales/:id', salesController.remove);

app.get('/sales', salesController.getAll);

app.post('/sales', salesController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
