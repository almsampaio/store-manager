const express = require('express');
const bodyParser = require('body-parser');
const productsRoute = require('./controllers/productController');
// const salesRoute = require('./controllers/salesController');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoute);
// app.use('/sales', salesRoute);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});