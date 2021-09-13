const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Project Store Manager'));