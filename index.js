const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);

app.post('/products', productController.createProduct);

app.put('/products/:id', productController.updateProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online!');
});
