const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const productsRoutes = require('./routes/products');
const errorMiddleware = require('./middlewares/errorHandling');

const {
  nameLengthValidation,
  notEqualNameValidation,
  quantityGreaterThanZeroValidation,
  quantityMustBeANumberValidation,
} = require('./middlewares/validations');

const validationsArray = [
  nameLengthValidation,
  notEqualNameValidation,
  quantityGreaterThanZeroValidation,
  quantityMustBeANumberValidation,
];

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', validationsArray, productsRoutes);
app.use(errorMiddleware);
app.listen(PORT, () => console.log('Store manager rodando na porta 3000'));
