const express = require('express');
const BodyParser = require('body-parser');
const Products = require('./controllers/Products');
const Validate = require('./middlewares/validate');

const PORT = 3000;
const app = express();
app.use(BodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.post('/products', Validate.checkName, Validate.checkProductQuantify, Products.create);