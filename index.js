const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/Products');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Porta ${PORT} está Online!`);
});

app.use('/products', productsRouter);
