const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');
const saleController = require('./controller/saleController');

const app = express();

app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.create);

app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

app.put('/products/:id', productController.update);

app.delete('/products/:id', productController.remove);

app.post('/sales', saleController.create);

app.listen(PORT, () => console.log(`O pai tá ON na Porta ${PORT}`));
