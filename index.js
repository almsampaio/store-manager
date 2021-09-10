// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');

const {
  validateName,
  validateNameInTable,
  validateQuantityType,
  validateQuantityValue,
  validateItemsSold,  
} = require('./services');

const {
  insertOneControler,
  findManyOrByIdControler,
  updateAndReturnOneController,
  deleteOneProductController,
  insertSaleControler,
  findByIdOrAllSalesController,
  updateSaleControler,
  deleteSaleController,
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

app.get('/products', findManyOrByIdControler);

app.get('/products/:id', findManyOrByIdControler);

app.put('/products/:id',
validateName,
validateQuantityType,
validateQuantityValue,
updateAndReturnOneController);

app.delete('/products/:id', deleteOneProductController);

app.post('/sales', validateItemsSold, insertSaleControler);

app.get('/sales', findByIdOrAllSalesController);

app.get('/sales/:id', findByIdOrAllSalesController);

app.put('/sales/:id', validateItemsSold, updateSaleControler);

app.delete('/sales/:id', deleteSaleController);

app.listen(PORT, () => {
  console.log('tamo on');
});
