const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsController = require('./controllers/productsController');

app.post('/products', productsController.create);

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`Mãe tá on na porta ${PORT}!`);
});
