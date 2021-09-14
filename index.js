const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', productsController.create);
app.put('/products/:id', productsController.update);
app.delete('/products/:id', productsController.remove);

app.post('/sales', salesController.create);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Porta ${PORT} online`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
