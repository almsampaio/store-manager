const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./src/routes/routes');

const { SERVER_PORT } = require('./src/config/server');

const app = express();
app.use(bodyParser.json());

app.get('/', async (_request, response) => {
  response.send();
});

app.use(routes);

app.listen(SERVER_PORT);
