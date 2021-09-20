const app = require('express')();
const bodyParser = require('body-parser');
const product = require('./controllers/productController');
const sales = require('./controllers/salesController');
const productValidate = require('./middlewares/productMid');
const salesValidate = require('./middlewares/salesMid');

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post(
  '/products',
  productValidate.validName,
  productValidate.validQuantity,
  product.create,
);

app.get('/products', product.getAll);

app.get('/products/:id', productValidate.validId, product.getById);

app.put(
  '/products/:id',
  productValidate.validId,
  productValidate.validName,
  productValidate.validQuantity,
  product.update,
);

app.delete('/products/:id', productValidate.validId, product.destroy);

app.post('/sales', salesValidate.validQuantity, sales.create);

app.get('/sales', sales.getAll);

app.get('/sales/:id', salesValidate.validSale, sales.getById);

app.listen(PORT, () => {
  console.log('Online: ', PORT);
});
