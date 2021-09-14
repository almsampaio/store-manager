const rescue = require('express-rescue');
const { message, status, code } = require('../schema');
const { salesServices } = require('../services');

const checkSalesQuantity = rescue((req, res, next) => {
  const { quantity } = req.body[0];
  const MIN_QUANTITY = 0;

  if (quantity <= MIN_QUANTITY) {
    return res.status(status.status.unprocessable).json({
      err: { code: code.code.invalidData, message: message.message.invalidQuantity },
    });
  }
  next();
});

const checkTypeSales = rescue((req, res, next) => {
  const { quantity } = req.body[0];
  
  if (typeof quantity === 'string') {
    return res.status(status.status.unprocessable).json({
      err: { code: code.code.invalidData, message: message.message.invalidQuantity },
    });
  }
  next();
});

const checkIdSales = rescue(async (req, res, next) => {
  const { id } = req.params;
  const idLength = 24;
  if (!id || id.length !== idLength) {
    res.status(status.status.notFound).json({
      err: { code: code.code.notFound, message: message.message.saleNotFound },
    }); 
  }
  next();
});

const checkIdDelete = rescue(async (req, res, next) => {
  const { id } = req.params;
  const idLength = 24;
  if (id.length !== idLength) {
    return res.status(status.status.unprocessable)
      .json({ err: { code: code.code.invalidData, message: message.wrongSaleIdFormat } });
  }
  const sale = await salesServices.findSale(id);
  if (!sale) {
    return res.status(status.status.notFound)
    .json({ err: { code: code.code.notFound, message: message.saleNotFound } });
  }
  next();
});

module.exports = { checkSalesQuantity, checkTypeSales, checkIdSales, checkIdDelete };
