const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsController = require('./controllers/productsController');

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', productsController.create);
app.put('/products/:id', productsController.editById);
app.delete('/products/:id', productsController.deleteById);

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`Mãe tá on na porta ${PORT}!`);
});
