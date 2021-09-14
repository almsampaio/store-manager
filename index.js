const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productController = require('./controllers/productController');

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

app.post('/products', productController.create);

app.put('/products/:id', productController.update);

app.delete('/products/:id', productController.remove);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
