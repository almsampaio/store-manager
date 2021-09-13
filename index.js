const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productControler');
const { quantityEqualToOne, 
  quantityNumber, 
  nameFiveCharacter, 
  ifExists } = require('./services/productService');

const app = express();
app.use(bodyParser.json());

app.get('/products', productController.getAllProducts);

app.post('/products', 
 quantityEqualToOne, 
 nameFiveCharacter, 
 quantityNumber, 
 ifExists,
 productController.validatedNameAndQuantity);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Im online bitch'));
