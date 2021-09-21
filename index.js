const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./controllers/consts');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

console.log('Hello, World!');

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

// app.put('/sales/:id', async (req, res) => {
//   const { id } = req.params;
// });

// app,put('/products/:id', async (req, res) => {
//   const { id } = req.params;

// });

app.post('/products', productsController.create);

app.post('/sales', salesController.create);

app.delete('/products/:id', productsController.remove);

app.delete('/sales/:id', salesController.remove);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('We are live!'));
