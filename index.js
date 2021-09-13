const express = require('express');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/productsControllers');
const { validateNameProduct,
  validateQuantityProduct } = require('./middlewares/productsMiddlewares');
const salesControllers = require('./controllers/salesControllers');
const { validateQuantitySales } = require('./middlewares/salesMiddlewares');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', 
validateNameProduct, validateQuantityProduct, productsControllers.createNewProduct);

app.get('/products', productsControllers.getAllProducts);

app.get('/products/:id', productsControllers.getById);

app.put('/products/:id', 
validateNameProduct, validateQuantityProduct, productsControllers.UpdateProductById);

app.delete('/products/:id', productsControllers.deleteProductById);

app.post('/sales', validateQuantitySales, salesControllers.createNewSales);

app.get('/sales', salesControllers.getAll);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));