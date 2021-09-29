const express = require('express');
const bodyParser = require('body-parser');
const productFunc = require('./routes/product');
const salesFunc = require('./routes/sales');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/products', productFunc);
app.use('/sales', salesFunc);

app.listen(PORT, () => {
  console.log('Online');
});
