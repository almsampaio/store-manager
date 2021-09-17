const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productControler');
const salesController = require('./controllers/salesControler');
const { quantityEqualToOne, 
  quantityNumber, 
  nameFiveCharacter, 
  ifExists,
} = require('./services/productService');
const { validateQuantity } = require('./services/salesService');

const app = express();
app.use(bodyParser.json());

app.get('/products', productController.getAllProducts);

app.post('/products', 
 quantityEqualToOne, 
 nameFiveCharacter, 
 quantityNumber, 
 ifExists,
 productController.validatedNameAndQuantity);

 app.get('/products/:id', productController.validateId);

 app.put('/products/:id', 
  nameFiveCharacter,
  quantityEqualToOne, 
  quantityNumber, 
  productController.updateUi);

  app.delete('/products/:id', productController.deleteId);

  app.get('/sales/', salesController.getAllSales);
  app.post('/sales', validateQuantity, salesController.salesCreate);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Im online bitch'));
