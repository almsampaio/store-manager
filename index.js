const express = require('express');
const bodyParser = require('body-parser');

// const productController = require('./controllers/productController');
// const salesController = require('./controllers/salesController');
const productsRoutes = require('./routes/productRouter');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.use('/products', productsRoutes);

// app.get('/products/:id', productController.getById);

// app.delete('/products/:id', productController.remove);

// app.get('/sales', salesController.getAll);

// app.get('/sales/:id', salesController.getById);

// app.post('/sales', salesController.create);

// app.put('/sales/:id', salesController.actualize);

// app.post('/sales', salesController.create);

// app.delete('/sales/:id', salesController.remove);

app.listen(PORT, () => {
  console.log('Servidor rodando');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
