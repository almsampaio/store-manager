const express = require('express');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
dotEnv.config();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
