// projeto realizado com ajuda dos estudantes Nilson Ribeiro e Adelino Junior.

const express = require('express');
const bodyParser = require('body-parser');
const { addProduct, getAll, getById, update, remove } = require('./controllers/products');
const { validName, validQuantity } = require('./services/validation');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => { console.log('online'); });

app.post('/products', validName, validQuantity, addProduct);
app.get('/products', getAll);
app.get('/products/:id', getById);
app.put('/products/:id', validName, validQuantity, update);
app.delete('/products/:id', remove);
