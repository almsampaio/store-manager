const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const productsRoutes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());
app.use(productsRoutes);

const { PORT } = process.env;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Server Online  "http://localhost:3001"'));
