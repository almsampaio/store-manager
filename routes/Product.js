const express = require('express');

const Router = express.Router();

Router.post('/', (req, res) => {
  res.send('Foi');
});

module.exports = Router;
