const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.put('/products/:id', productsController.updateProduct);

app.post('/products', productsController.create);
app.post('/sales', salesController.create);

app.delete('/products/:id', productsController.deleteProduct);

app.listen(PORT, () => console.log('Servidor no ar!'));
