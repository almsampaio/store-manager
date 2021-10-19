const { message, status, code } = require('../messages');
const { salesServices } = require('../services');

const checkSalesQuantity = (req, res, next) => {
  const { quantity } = req.body[0];
  const MIN_QUANTITY = 0;

  if (quantity <= MIN_QUANTITY) {
    return res.status(status.unprocessable).json({
      err: { code: code.invalidData, message: message.invalidQuantity },
    });
  }
  
  next();
};

const checkTypeSales = (req, res, next) => {
  const { quantity } = req.body[0];
  
  if (typeof quantity === 'string') {
    return res.status(status.unprocessable).json({
      err: { code: code.invalidData, message: message.invalidQuantity },
    });
  }

  next();
};

const checkIdSales = async (req, res, next) => {
  const { id } = req.params;
  const idLength = 24;

  if (!id || id.length !== idLength) {
    res.status(status.notFound).json({
      err: { code: code.notFound, message: message.saleNotFound },
    }); 
  }

  // O readme não disse que essa verificação seria necessária, mas a falta dela faz o requisito 8 quebrar, tive ajuda do Lucas Pedroso para enxergar essa falha do readme e consequentemente finalizar o requisito 8.
  const sale = await salesServices.findSale(id);
  if (!sale) {
    return res.status(status.notFound)
    .json({ err: { code: code.notFound, message: message.saleNotFound } });
  }

  next();
};

const checkIdDelete = async (req, res, next) => {
  const { id } = req.params;
  const idLength = 24;
  const sale = await salesServices.findSale(id);

  if (!id || id.length !== idLength) {
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.wrongSaleIdFormat } });
  }

  if (!sale) {
    return res.status(status.notFound)
    .json({ err: { code: code.notFound, message: message.saleNotFound } });
  }

  next();
};

const quantitySales = [
  checkSalesQuantity,
  checkTypeSales,
];

module.exports = {
  quantitySales,
  checkIdSales,
  checkIdDelete,
};
