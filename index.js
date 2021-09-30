const bodyParser = require('body-parser');

const express = require('express');
const controllerProducts = require('./controllers/products');
const controllerSales = require('./controllers/sales');

// não remova esse endpoint, e para o avaliador funcionar

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controllerProducts.newProduct);
app.get('/products', controllerProducts.getAll);
app.get('/products/:id', controllerProducts.searchById);
app.put('/products/:id', controllerProducts.updateProduct);
app.delete('/products/:id', controllerProducts.deleteProduct);

app.post('/sales', controllerSales.inputSales);
app.get('/sales', controllerSales.getAll);
app.get('/sales/:id', controllerSales.searchSale);
app.put('/sales/:id', controllerSales.updateSale);

app.listen(3000, () => console.log('API in running!'));
