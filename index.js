const express = require('express');
const bodyParser = require('body-parser');
const {
  create,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
} = require('./controllers/Products');
const { validateName, validateQuantity } = require('./middlewares/validation');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.clear();
  console.log(`O pai tá ON, na porta ${PORT}`);
});

app.get('/products', getAll);
app.get('/products/:id', findById);
app.post('/products', validateName, validateQuantity, create);
app.put('/products/:id', validateName, validateQuantity, updateProduct);
app.delete('/products/:id', deleteProduct);
