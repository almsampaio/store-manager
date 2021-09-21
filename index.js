// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');

const { create, getAll, getById, update, remove } = require('./controlers/productControlles');
const { createSales, getAllSales, getByIdSales } = require('./controlers/salesController');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);
app.get('/products/:id', getById);
app.post('/products', create);
app.put('/products/:id', update);
app.delete('/products/:id', remove);

app.post('/sales', createSales);
app.get('/sales', getAllSales);
app.get('/sales/:id', getByIdSales);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
