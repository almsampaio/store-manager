const express = require('express');
const bodyParser = require('body-parser');
const productsControllers = require('./controllers/productsControllers');
const { validateNameNewProduct,
  validateQuantityNewProduct } = require('./middlewares/productsMiddlewares');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', 
validateNameNewProduct, validateQuantityNewProduct, productsControllers.createNewProduct);

app.get('/products', productsControllers.getAllProducts);

const PORT = 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));