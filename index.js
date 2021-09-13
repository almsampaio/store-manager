require('dotenv').config();

const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/saleRoute');

// não remova esse endpoint, e para o avaliador funcionar
app.use('/products', productRoute);
app.use('/sales', saleRoute);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
  console.log(`Acessar: http://localhost:${PORT}`);
});
