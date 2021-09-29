// imports
const express = require('express');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const dbConnection = require('./model/connection');

// instance and config
const app = express();
dotEnv.config();

// db connectivity
dbConnection();

// request payload middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('Project - Storage Manager');
});

// routers
app.use('/products', require('./routes/productRoutes'));

// port and listening
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// error handler middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
