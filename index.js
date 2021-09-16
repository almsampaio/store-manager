// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');

const { create, getAll, getById } = require('./controlers/productControlles');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);
app.get('/products/:id', getById);
app.post('/products', create);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
