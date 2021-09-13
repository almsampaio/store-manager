const express = require('express');
const BodyParser = require('body-parser');
const Validation = require('./middlewares/validation');
const Products = require('./controllers/Products');

const PORT = 3000;

const app = express();
app.use(BodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
});

app.post('/products', Validation.nameValidation, Validation.quantityValidation, Products.create);

app.get('/products', Products.findAllProducts);

app.get('/products/:id', Products.findProductById);
