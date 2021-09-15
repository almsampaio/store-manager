const express = require('express');
const bodyParser = require('body-parser');
const {
  create,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
} = require('./controllers/Products');
const {
  create: createSale,
  getAll: getAllSale,
  findById: findSaleById,
  updateSale,
  deleteSale,
} = require('./controllers/Sales');
const {
  validateName,
  validateQuantity,
  validateSaleType,
  validateSaleNumbers,
} = require('./middlewares/validation');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.post('/products', validateName, validateQuantity, create);
app.get('/products', getAll);
app.get('/products/:id', findById);
app.put('/products/:id', validateName, validateQuantity, updateProduct);
app.delete('/products/:id', deleteProduct);

app.post('/sales', validateSaleType, validateSaleNumbers, createSale);
app.get('/sales', getAllSale);
app.get('/sales/:id', findSaleById);
app.put('/sales/:id', validateSaleType, validateSaleNumbers, updateSale);
app.delete('/sales/:id', deleteSale);

app.listen(PORT, () => {
  console.clear();
  console.log(`Rodando na porta: ${PORT}`);
});
