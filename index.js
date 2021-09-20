const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./router/productsRouter');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Online');
});
