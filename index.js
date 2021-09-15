const express = require('express');
const bodyParser = require('body-parser');

const {
  postOneProduct,
  getAllProducts,
  getOneProductByID,
  putOneProductByID,
  deleteOneProductByID,
} = require('./CONTROLLERS/ProductsController');

const {
  postOneSale,
  getAllSales,
  getOneSaleByID,
} = require('./CONTROLLERS/SalesController');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/Ping', (_req, res) => {
  console.log('OK');
  return res.status(200).send('Pong');
});

app.post('/products', postOneProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', getOneProductByID);
app.put('/products/:id', putOneProductByID);
app.delete('/products/:id', deleteOneProductByID);

app.post('/sales', postOneSale);
app.get('/sales', getAllSales);
app.get('/sales/:id', getOneSaleByID);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
