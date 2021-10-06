const express = require('express');
const bodyParser = require('body-parser');

const product = require('./controllers/Products');
const sale = require('./controllers/Sales');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', product.create);
app.get('/products', product.readAll);
app.get('/products/:id', product.readById);
app.put('/products/:id', product.update);
app.delete('/products/:id', product.destroy);

app.post('/sales', sale.create);
app.get('/sales', sale.readAll);
app.get('/sales/:id', sale.readById);
app.put('/sales/:id', sale.update);
app.delete('/sales/:id', sale.destroy);

app.use(errorMiddleware);

const LOCALHOST = 3000;
const port = process.env.PORT || LOCALHOST;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
