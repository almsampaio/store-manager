const express = require('express');
const bodyParse = require('body-parser');
const controllerProduct = require('./controller/products');
const controllerSales = require('./controller/sales');

const port = 3000;

const app = express();

app.use(bodyParse.json());

app.post('/products', controllerProduct.createProduct);

app.get('/products', controllerProduct.findProducts);

app.get('/products/:id', controllerProduct.findProductId);

app.put('/products/:id', controllerProduct.updateProduct);

app.delete('/products/:id', controllerProduct.deleteProduct);

app.post('/sales', controllerSales.createSale);

app.use((err, _req, res, _next) => {
  const { message, code, status } = err;
  return res.status(status).json({ err: { code, message } });
});

app.listen(port, () => console.log(port));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
