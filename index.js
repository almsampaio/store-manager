const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/products', ProductsController.create);
app.get('/products/', ProductsController.getAll);
app.get('/products/:id', ProductsController.getById);
app.put('/products/:id', ProductsController.update);
app.delete('/products/:id', ProductsController.remove);

app.post('/sales', SalesController.create);
app.get('/sales/', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);
app.put('/sales/:id', SalesController.update);
app.delete('/sales/:id', SalesController.remove);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
