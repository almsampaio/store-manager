const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controllers/ProductsController');
const salesController = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);
app.get('/products', ProductsController.getAll);
app.get('/products/:_id', ProductsController.getById);
app.put('/products/:_id', ProductsController.updateById);
app.delete('/products/:_id', ProductsController.deleteById);

app.post('/sales', salesController.create);
app.get('/sales', salesController.getAll);
app.get('/sales/:_id', salesController.getById);
app.put('/sales/:_id', salesController.update);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
