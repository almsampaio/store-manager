const express = require('express');
const bodyParser = require('body-parser');

const rescue = require('express-rescue');

const app = express();
const PORT = 3000;
const productController = require('./controller/productController');
const salesController = require('./controller/salesController');

app.use(bodyParser.json());

// user
app.post('/products', rescue(productController.createProduct));
app.get('/products/:id', rescue(productController.getOne));
app.get('/products/', rescue(productController.getAll));
app.put('/products/:id', rescue(productController.updateOne));
app.delete('/products/:id', rescue(productController.delOne));
// sales
app.post('/sales', rescue(salesController.createSales));
app.get('/sales/:id', rescue(salesController.getOne));
app.get('/sales/', rescue(salesController.getAll));
// app.put('/sales/:id', salesController.updateOne);
// app.delete('/sales/:id', salesController.delOne);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send());

app.use((error, _req, res, _next) => {
  console.log(error);
  if (error.status) return res.status(error.status).json({ err: error });
  return res.status(500).json(error.message);
});

app.listen(PORT, () => console.log(`rodando na porta ${PORT}`));