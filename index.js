// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');

const {
  validateName,
  validateNameInTable,
  validateQuantityType,
  validateQuantityValue,
} = require('./services');

const {
  insertOneControler,
} = require('./controlers');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products',
validateName,
validateNameInTable,
validateQuantityType,
validateQuantityValue,
insertOneControler);

app.listen(PORT, () => {
  console.log('tamo on');
});
