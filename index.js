const express = require('express');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/productsControllers');
const { validateNameProduct,
  validateQuantityProduct } = require('./middlewares/productsMiddlewares');

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));