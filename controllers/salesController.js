// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());

// const HTTP_OK_STATUS = 200;
// const HTTP_CREATED_STATUS = 201;
// // const HTTP_NOT_FOUND_STATUS = 404;
// const HTTP_NO_BODY_STATUS = 422;

// const salesService = require('../services/salesService');

// const getAll = async (_req, res) => {
//   const { sale } = await salesService.getAll();

//   return res.status(HTTP_OK_STATUS).json(sale);
// };

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const { code, message, sale } = await salesService.getById(id);
//   if (code && message) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });
//   res.status(HTTP_OK_STATUS).json(sale);
// };

// const create = async (req, res) => {
//   const { name, quantity } = req.body;
//   console.log('name, quantity ----- saleController', name, quantity);
//   const { code, message, sale } = await salesService.create(name, quantity);
//   // const RESPOSTA = await salesService.create(name, quantity);

//   // console.log('RESPOSTA ---- saleController', RESPOSTA);
//   if (code && message) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });

//   res.status(HTTP_CREATED_STATUS).json(sale);
// };

// const actualize = async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const { code, message, sale } = await salesService.actualize(name, quantity, id);
//   if (code && message) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });
//   res.status(HTTP_OK_STATUS).json(sale);
// };

// const remove = async (req, res) => {
//   const { id } = req.params;
//   const { code, message, sale } = await salesService.getById(id);
//   if (!sale) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });
//   await salesService.remove(id);
//   res.status(HTTP_OK_STATUS).end();
// };

// module.exports = {
//   create,
//   getAll,
//   getById,
//   actualize,
//   remove,
// };