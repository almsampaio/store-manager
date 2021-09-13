const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server rodando na porta 3000');
});

// ---------------------------------------------------- PRODUCTS ---------------------------------------------------- //

const productRouter = require('./router/productRouter');

app.use('/products', productRouter);

// ----------------------------------------------------- SALES ----------------------------------------------------- //

const saleRouter = require('./router/saleRouter');

app.use('/sales', saleRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
