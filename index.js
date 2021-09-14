const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./src/routes/productRouter');
const salesRouter = require('./src/routes/salesRouter');

const app = express();

app.use(bodyParser.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online');
});
