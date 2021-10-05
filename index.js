const express = require('express');
const BodyParser = require('body-parser');
const productController = require('./controllers/Products');
const saleController = require('./controllers/Sales');

const PORT = 3000;
const app = express();

app.use(BodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

// routes para os Products
app.post('/products', productController.create);
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.deleteProduct);

// req 1 finished
// req 2 finished
// req 3 finished
// req 4 finished

// routes para as Sales
app.post('/sales', saleController.create);
app.get('/sales', saleController.getAll);
app.get('/sales/:id', saleController.getSaleById);
app.put('/sales/:id', saleController.update);
app.delete('/sales/:id', saleController.deleteSale);

// para os requisitos 8, 9 e 10, consultei o PR
// https://github.com/tryber/sd-010-a-store-manager/pull/18/files
