const bodyParser = require('body-parser');
const { ObjectId } = require('bson');
const express = require('express');
const validateNameLength = require('./middlewares/validateNameLength');
const validateQuantityLength = require('./middlewares/validateQuantityLength');
const validateQuantityTypeof = require('./middlewares/validateQuantityTypeof');
const validateTheProductRepeats = require('./middlewares/validateTheProductRepeats');
const { createNewProduct } = require('./models/productsModels');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

const validantionsName = [validateNameLength, validateTheProductRepeats];
const validantionsQuantity = [validateQuantityTypeof, validateQuantityLength];
app.post('/products', validantionsName, validantionsQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await createNewProduct(name, quantity);
  res.status(201).json({ _id: new ObjectId(newProduct), name, quantity });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`localHost ouvindo a porta ${PORT}`);
});