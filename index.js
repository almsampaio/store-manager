const express = require('express');
const bodyParser = require('body-parser');

const productsControllers = require('./controllers/productsControllers');
// const salesControllers = require('./controllers/salesControllers');
const validations = require('./validations');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.post('/products', 
  validations.validateName, 
  validations.validateQuantity,
  productsControllers.add);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`App online at port ${PORT}`);
});