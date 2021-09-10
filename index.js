const express = require('express');
const bodyParser = require('body-parser');
// const { getAllProducts } = require('./controllers/productController');
// const { getAllSales } = require('./controllers/salesController');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.get('/products', getAllProducts);
// app.get('/sales', getAllSales);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});