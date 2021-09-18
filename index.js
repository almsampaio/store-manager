const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./productsRouter');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`localHost ouvindo a porta ${PORT}`);
});