const express = require('express');
const BodyParser = require('body-parser');
const productController = require('./controllers/Products');

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

// req 1 finished
// req 2 finished
// req 3 finished
