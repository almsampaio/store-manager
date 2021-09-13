const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales');

const app = express();
app.use(bodyParser.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('ONLINE');
});