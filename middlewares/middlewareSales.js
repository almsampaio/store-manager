const salesService = require('../services/salesService');
const { ObjectID } = require('mongodb');
const HTTP_UNPROCESS_CLIENT = 422;
const HTTP_NOT_FOUND = 404;

const validaQuantidade = (req, res, next) => {
  const sales = req.body; 
  const zero = 0;
  for(let index = zero; index < sales.length; index++){
    const quantity = sales[index].quantity;
    if(typeof sales[index].quantity != 'number' || sales[index].quantity <= zero) {
      return res.status(HTTP_UNPROCESS_CLIENT).json({
        err: { 
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
    }
    
  }
  next();
};

const validaIdSale = (req, res, next) => {
  const { id } = req.params;
  try{
    ObjectID(id);
  } catch(_err){
    return res.status(HTTP_UNPROCESS_CLIENT).json({
      err: { 
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
  }
  next();
};

const validaIdParams = (req, res, next) => {
  const { id } = req.params;
  try{
    ObjectID(id);
  } catch(_err){
    return res.status(HTTP_NOT_FOUND).json({
      err: { 
        code: 'not_found',
        message: 'Sale not found',
      }
    });
  }
  next();
};

const validaId = (req, res, next) => {
  const sales = req.body; 
  const zero = 0;
  for(let index = zero; index < sales.length; index++){
    const id = sales[index].productId;
    try{
      ObjectID(id);
    } catch(_err){
      return res.status(HTTP_UNPROCESS_CLIENT).json({
        err: { 
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
    }
  }
  next();
};

module.exports = {
  validaQuantidade,
  validaId,
  validaIdParams,
  validaIdSale,
};
