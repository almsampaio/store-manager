const express = require('express');
const bodyParse = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
// const { validateId } = require('./middlewares/validateId');

const app = express();
app.use(bodyParse.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

app.put('/products/:id', productsController.update);

app.delete('/products/:id', productsController.exclude);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.post('/sales', salesController.create);

app.listen(PORT, () => {
  console.log('Aplicação tá on');
});
