const express = require('express');
const bodyParser = require('body-parser');
const productControlle = require('./controllers/productControlle');
const saleControlle = require('./controllers/salesControlle');
const validtion = require('./middleware/middleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// Products

app.post('/products', validtion.isValidName, validtion.isValidQuanty, productControlle.addProduct);
app.get('/products', productControlle.findAll);
app.get('/products/:id', productControlle.findById);
app.put('/products/:id', validtion.isValidName, validtion.isValidQuanty,
  productControlle.updateProduct);
app.delete('/products/:id', productControlle.excludeProduct);

// Sales
app.post('/sales', validtion.isValidSales, saleControlle.insertSale);
app.get('/sales', saleControlle.findAll);
app.get('/sales/:id', saleControlle.findById);
app.put('/sales/:id', validtion.isValidSales, saleControlle.updateSale);

app.listen(PORT, () => console.log(`On-line na porta ${PORT}`));
