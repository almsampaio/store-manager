const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./src/controllers/ProductController');

const { SERVER_PORT } = require('./src/config/server');

const app = express();
app.use(bodyParser.json());

app.get('/', async (_request, response) => {
  response.send();
});

// Products
app.get('/products', ProductController.listAll);
app.get('/products/:id', ProductController.findById);
app.post('/products', ProductController.create);
app.put('/products/:id', ProductController.update);
app.delete('/products/:id', ProductController.remove);

app.listen(SERVER_PORT);
