const bodyParser = require('body-parser');

const express = require('express');
const controllerProducts = require('./controllers/products');

// não remova esse endpoint, e para o avaliador funcionar

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controllerProducts.newProduct);
app.get('/products', controllerProducts.getAll);
app.get('/products/:id', controllerProducts.searchById);
app.put('/products', controllerProducts.updateProduct);

app.listen(3000, () => console.log('API in running!'));
