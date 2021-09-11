const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.createProduct);

app.put('/products/:id', productsController.updateProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Online at PORT: ${PORT}`);
});
