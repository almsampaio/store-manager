const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.listProduct);
app.get('/products/:id', productController.listProductId);
app.put('/products/:id', productController.updateProduct);
app.post('/products', productController.addProduct);

app.listen(3000, () => console.log('Project Store Manager'));