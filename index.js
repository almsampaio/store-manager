const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Online');
});
