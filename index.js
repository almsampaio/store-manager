const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('partiu'));