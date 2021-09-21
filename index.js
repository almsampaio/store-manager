const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/Products');
const salesRouter = require('./routes/Sales');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.listen(PORT, () => {
  console.log(`Porta ${PORT} está Online!`);
});
