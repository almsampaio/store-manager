const saleService = require('../services/saleSercive');

const HTTP_OK_STATUS = 200;

const register = async (req, res) => {
    const sales = req.body;
  
    const { _id } = await saleService.register(sales);
    const result = { _id, itensSold: sales };
    console.log(result);
    res.status(HTTP_OK_STATUS).json(result);
  };

  module.exports = {
    register,
}; 