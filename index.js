const express = require('express');
const bodyparser = require('body-parser');

const controller = require('./controllers/products');

const app = express();
app.use(bodyparser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controller.create); /* async (req, res) => {
  const { name, quantity } = req.body;
  const createProducts = await create(name, quantity);
  console.log(createProducts);
  return res.status(201).json(createProducts); 
}); */

app.get('/products', controller.getAll);/* async (req, res) => {
  const productsAll = await getAll();
  res.status(200).json(productsAll);
}); */

app.listen(PORT, () => {
  console.log('Online');
});